<?php
// Gedeelde functies voor de formulieren van kenazorg.nl.
// Gevoelige instellingen staan BUITEN de webroot in: private/kenazorg-config.php (naast httpdocs).

declare(strict_types=1);

function load_config(): array
{
    $defaults = [
        'recipient'      => 'info@kenazorg.nl',          // ontvanger van alle aanvragen
        'recipients'     => [],                           // optioneel per formulier, bv. ['aanmelding' => 'aanmelding@kenazorg.nl']
        'from_email'     => 'noreply@kenazorg.nl',        // adres op het eigen domein (SPF/DKIM)
        'from_name'      => 'Kena Zorg website',
        'allowed_hosts'  => ['kenazorg.nl', 'www.kenazorg.nl', 'new.kenazorg.nl'], // new. = testomgeving
        'smtp'           => null,                         // ['host'=>'', 'port'=>587, 'secure'=>'tls'|'ssl', 'user'=>'', 'pass'=>'']
    ];
    $file = dirname(__DIR__, 2) . '/private/kenazorg-config.php';
    if (is_file($file)) {
        $cfg = require $file;
        if (is_array($cfg)) return array_replace($defaults, $cfg);
    }
    return $defaults;
}

function json_response(int $status, array $data): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function require_same_origin(array $cfg): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    $host = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($host === '' || !in_array($host, $cfg['allowed_hosts'], true)) {
        json_response(403, ['ok' => false, 'error' => 'Ongeldige aanvraag.']);
    }
}

/** Eenvoudige rate limit per IP op basis van een tijdelijk bestand. */
function rate_limit(string $key, int $max, int $seconds): void
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'onbekend';
    $file = sys_get_temp_dir() . '/kena_rl_' . hash('sha256', $key . '|' . $ip);
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = array_filter(
            array_map('intval', explode(',', (string) file_get_contents($file))),
            fn ($t) => $t > $now - $seconds
        );
    }
    if (count($hits) >= $max) {
        json_response(429, ['ok' => false, 'error' => 'Je hebt al een paar keer een formulier verstuurd. Probeer het over een paar minuten opnieuw of bel ons.']);
    }
    $hits[] = $now;
    file_put_contents($file, implode(',', $hits), LOCK_EX);
}

function clean_line(string $v, int $max = 200): string
{
    $v = trim(preg_replace('/[\r\n\t]+/', ' ', $v) ?? '');
    return mb_substr($v, 0, $max);
}

function clean_text(string $v, int $max = 5000): string
{
    $v = str_replace("\r\n", "\n", trim($v));
    return mb_substr($v, 0, $max);
}

function h(string $v): string
{
    return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function encode_header(string $v): string
{
    return '=?UTF-8?B?' . base64_encode($v) . '?=';
}

/**
 * Verstuur een HTML-mail met platte-tekstversie en optionele bijlagen.
 * Gebruikt SMTP als dat in de config staat, anders mail() met -f (envelope sender).
 *
 * @param array<int, array{name:string, path:string, type:string}> $attachments
 */
function send_mail(array $cfg, string $to, string $subject, string $html, string $text, ?string $replyTo = null, array $attachments = []): bool
{
    $boundaryAlt = 'alt_' . bin2hex(random_bytes(12));
    $boundaryMix = 'mix_' . bin2hex(random_bytes(12));
    $fromHeader = encode_header($cfg['from_name']) . ' <' . $cfg['from_email'] . '>';

    $headers = [
        'Date: ' . date('r'),
        'From: ' . $fromHeader,
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . substr(strrchr($cfg['from_email'], '@'), 1) . '>',
        'MIME-Version: 1.0',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = 'Reply-To: ' . $replyTo;

    $alt = "--$boundaryAlt\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$boundaryAlt\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$boundaryAlt--\r\n";

    if ($attachments) {
        $headers[] = "Content-Type: multipart/mixed; boundary=\"$boundaryMix\"";
        $body = "--$boundaryMix\r\nContent-Type: multipart/alternative; boundary=\"$boundaryAlt\"\r\n\r\n" . $alt;
        foreach ($attachments as $a) {
            $name = preg_replace('/[^\w.\- ]+/u', '_', $a['name']) ?: 'bijlage';
            $body .= "--$boundaryMix\r\nContent-Type: {$a['type']}; name=\"" . encode_header($name) . "\"\r\n"
                . "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"" . encode_header($name) . "\"\r\n\r\n"
                . chunk_split(base64_encode((string) file_get_contents($a['path'])));
        }
        $body .= "--$boundaryMix--\r\n";
    } else {
        $headers[] = "Content-Type: multipart/alternative; boundary=\"$boundaryAlt\"";
        $body = $alt;
    }

    if (!empty($cfg['smtp']['host'])) {
        return smtp_send($cfg, $to, encode_header($subject), $headers, $body);
    }
    return mail($to, encode_header($subject), $body, implode("\r\n", $headers), '-f' . $cfg['from_email']);
}

/** Minimale SMTP-client (STARTTLS of SSL, AUTH LOGIN). */
function smtp_send(array $cfg, string $to, string $subject, array $headers, string $body): bool
{
    $s = $cfg['smtp'];
    $secure = $s['secure'] ?? 'tls';
    $host = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $s['host'] . ':' . (int) ($s['port'] ?? 587);
    $fp = @stream_socket_client($host, $errno, $errstr, 15);
    if (!$fp) {
        error_log("SMTP verbinding mislukt: $errstr");
        return false;
    }
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function (string $c, array $ok) use ($fp, $read): bool {
        fwrite($fp, $c . "\r\n");
        $r = $read();
        if (!in_array((int) substr($r, 0, 3), $ok, true)) {
            error_log('SMTP fout bij "' . explode(' ', $c)[0] . '": ' . trim($r));
            return false;
        }
        return true;
    };
    $ehlo = 'EHLO ' . (substr(strrchr($cfg['from_email'], '@'), 1) ?: 'localhost');
    $ok = (int) substr($read(), 0, 3) === 220 && $cmd($ehlo, [250]);
    if ($ok && $secure === 'tls') {
        $ok = $cmd('STARTTLS', [220])
            && stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)
            && $cmd($ehlo, [250]);
    }
    if ($ok && !empty($s['user'])) {
        $ok = $cmd('AUTH LOGIN', [334]) && $cmd(base64_encode($s['user']), [334]) && $cmd(base64_encode($s['pass']), [235]);
    }
    $ok = $ok && $cmd('MAIL FROM:<' . $cfg['from_email'] . '>', [250]) && $cmd('RCPT TO:<' . $to . '>', [250, 251]) && $cmd('DATA', [354]);
    if ($ok) {
        $msg = implode("\r\n", array_merge(["To: <$to>", "Subject: $subject"], $headers)) . "\r\n\r\n" . $body;
        $msg = preg_replace('/^\./m', '..', $msg);
        $ok = $cmd($msg . "\r\n.", [250]);
    }
    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}
