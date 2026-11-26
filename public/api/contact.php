<?php
// Verwerkt alle formulieren van kenazorg.nl: contact, vooroverleg, officiële aanmelding en sollicitatie.
declare(strict_types=1);

require __DIR__ . '/_lib.php';
require __DIR__ . '/_mail-confirm.php';

$cfg = load_config();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    json_response(405, ['ok' => false, 'error' => 'Alleen POST is toegestaan.']);
}
require_same_origin($cfg);

// Honeypot ingevuld = bot. Stil "succes" teruggeven.
if (!empty($_POST['website'])) json_response(200, ['ok' => true]);

rate_limit('formulier', 5, 600);

$FORMS = [
    'contact'      => ['label' => 'Contactformulier',          'required' => ['naam', 'email', 'bericht'],                                         'consent' => false],
    'vooroverleg'  => ['label' => 'Aanmelden vooroverleg',     'required' => ['naam', 'email', 'telefoon'],                                        'consent' => false],
    'aanmelding'   => ['label' => 'Officiële aanmelding',      'required' => ['naam_jeugdige', 'geboortedatum_jeugdige', 'reden', 'naam', 'telefoon', 'email'], 'consent' => true],
    'sollicitatie' => ['label' => 'Werken bij Kena Zorg',      'required' => ['naam', 'email', 'telefoon'],                                        'consent' => true],
];

$formId = (string) ($_POST['form'] ?? '');
if (!isset($FORMS[$formId])) json_response(400, ['ok' => false, 'error' => 'Onbekend formulier.']);
$form = $FORMS[$formId];

// Velden verzamelen (alleen veilige veldnamen; arrays voor checkboxen).
$skip = ['form', 'website', 'akkoord'];
$data = [];
foreach ($_POST as $key => $value) {
    if (in_array($key, $skip, true) || !preg_match('/^[a-z0-9_]{1,60}$/', (string) $key)) continue;
    if (is_array($value)) {
        $vals = array_slice(array_filter(array_map(fn ($v) => clean_line((string) $v), $value)), 0, 20);
        if ($vals) $data[$key] = implode(', ', $vals);
    } else {
        $v = in_array($key, ['bericht', 'reden'], true) || strlen((string) $value) > 200 ? clean_text((string) $value) : clean_line((string) $value);
        if ($v !== '') $data[$key] = $v;
    }
    if (count($data) > 80) break;
}

$errors = [];
foreach ($form['required'] as $r) {
    if (empty($data[$r])) $errors[$r] = 'Dit veld is verplicht.';
}
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Vul een geldig e-mailadres in.';
if ($form['consent'] && empty($_POST['akkoord'])) $errors['akkoord'] = 'Geef aan dat je akkoord gaat met de privacyverklaring.';
if ($errors) json_response(422, ['ok' => false, 'error' => 'Controleer de gemarkeerde velden.', 'fields' => $errors]);

// Bijlagen controleren.
$allowed = [
    'pdf'  => ['application/pdf'],
    'doc'  => ['application/msword', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
    'jpg'  => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'png'  => ['image/png'],
];
$attachments = [];
$total = 0;
$finfo = new finfo(FILEINFO_MIME_TYPE);
foreach ($_FILES as $field => $f) {
    if (!preg_match('/^[a-z_]{1,40}$/', (string) $field)) continue;
    $names = (array) $f['name'];
    foreach ($names as $i => $name) {
        $err = ((array) $f['error'])[$i] ?? UPLOAD_ERR_NO_FILE;
        if ($err === UPLOAD_ERR_NO_FILE) continue;
        if ($err !== UPLOAD_ERR_OK) json_response(422, ['ok' => false, 'error' => 'Een bijlage kon niet worden geüpload. Probeer een kleiner bestand.']);
        $tmp = ((array) $f['tmp_name'])[$i];
        $size = (int) ((array) $f['size'])[$i];
        $ext = strtolower(pathinfo((string) $name, PATHINFO_EXTENSION));
        $mime = (string) $finfo->file($tmp);
        if (!isset($allowed[$ext]) || !in_array($mime, $allowed[$ext], true)) {
            json_response(422, ['ok' => false, 'error' => 'Alleen pdf, Word, jpg of png zijn toegestaan als bijlage.']);
        }
        if ($size > 8 * 1024 * 1024) json_response(422, ['ok' => false, 'error' => 'Een bijlage is groter dan 8 MB.']);
        $total += $size;
        if ($total > 20 * 1024 * 1024 || count($attachments) >= 7) {
            json_response(422, ['ok' => false, 'error' => 'Te veel of te grote bijlagen. Stuur ze apart naar ' . $cfg['recipient'] . '.']);
        }
        if (!is_uploaded_file($tmp)) continue;
        $attachments[] = ['name' => (string) $name, 'path' => $tmp, 'type' => $mime];
    }
}

// Mail naar Kena Zorg.
$label = fn (string $k) => ucfirst(str_replace('_', ' ', $k));
$rows = '';
$plain = $form['label'] . "\n" . str_repeat('=', mb_strlen($form['label'])) . "\n\n";
foreach ($data as $k => $v) {
    $rows .= '<tr><td style="padding:8px 12px;border-bottom:1px solid #eee3da;color:#7D6556;vertical-align:top;width:38%">' . h($label($k)) . '</td>'
        . '<td style="padding:8px 12px;border-bottom:1px solid #eee3da;color:#382C22">' . nl2br(h($v)) . '</td></tr>';
    $plain .= $label($k) . ': ' . $v . "\n";
}
if ($attachments) {
    $list = implode(', ', array_map(fn ($a) => $a['name'], $attachments));
    $rows .= '<tr><td style="padding:8px 12px;color:#7D6556">Bijlagen</td><td style="padding:8px 12px">' . h($list) . '</td></tr>';
    $plain .= "Bijlagen: $list\n";
}
$plain .= "\nVerstuurd via kenazorg.nl op " . date('d-m-Y H:i') . "\n";
$html = '<!doctype html><html lang="nl"><body style="margin:0;background:#FBF7F3;font-family:Arial,sans-serif">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:24px">'
    . '<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px">'
    . '<tr><td style="padding:24px 24px 8px;font-family:Georgia,serif;font-size:24px;color:#382C22">' . h($form['label']) . '</td></tr>'
    . '<tr><td style="padding:0 12px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">' . $rows . '</table></td></tr>'
    . '<tr><td style="padding:0 24px 24px;font-size:12px;color:#7D6556">Verstuurd via kenazorg.nl op ' . date('d-m-Y H:i') . '</td></tr>'
    . '</table></td></tr></table></body></html>';

$to = $cfg['recipients'][$formId] ?? $cfg['recipient'];
$who = $data['naam'] ?? 'onbekend';
$subject = '[Website] ' . $form['label'] . ' – ' . $who;
$sent = send_mail($cfg, $to, $subject, $html, $plain, $data['email'] ?? null, $attachments);

if (!$sent) {
    error_log("kenazorg: mail voor formulier $formId kon niet worden verstuurd");
    json_response(500, ['ok' => false, 'error' => 'Je bericht kon niet worden verstuurd.']);
}

// Bevestiging naar de aanvrager (zonder de inhoud van het bericht).
if (!empty($data['email'])) {
    [$cHtml, $cText] = confirm_mail($data['naam'] ?? '', $form['label'], $formId);
    send_mail($cfg, $data['email'], 'We hebben je bericht ontvangen – Kena Zorg', $cHtml, $cText);
}

json_response(200, ['ok' => true]);
