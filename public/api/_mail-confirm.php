<?php
// Gebrande bevestigingsmail in de huisstijl van Kena Zorg (tabellen voor Outlook, Georgia als fallback-serif).
declare(strict_types=1);

/** @return array{0:string,1:string} [html, tekst] */
function confirm_mail(string $name, string $formLabel, string $formId): array
{
    $first = h(explode(' ', trim($name))[0] ?? '');
    $hi = $first !== '' ? "Beste $first," : 'Beste,';
    $isJob = $formId === 'sollicitatie';
    $steps = $isJob
        ? ['We hebben je gegevens goed ontvangen.', 'We bekijken je cv en motivatie.', 'We nemen zo snel mogelijk contact met je op.']
        : ['We hebben je bericht goed ontvangen.', 'Een van onze medewerkers bekijkt je aanvraag.', 'We nemen zo snel mogelijk contact met je op.'];

    $stepRows = '';
    foreach ($steps as $i => $s) {
        $n = $i + 1;
        $stepRows .= '<tr><td style="padding:6px 0;vertical-align:top;width:40px">'
            . '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:28px;height:28px;border-radius:14px;background:#382C22;color:#FBF7F3;font-family:Georgia,serif;font-size:15px;text-align:center;line-height:28px">' . $n . '</td></tr></table>'
            . '</td><td style="padding:10px 0 6px;font-size:15px;color:#59473B">' . h($s) . '</td></tr>';
    }

    $html = '<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Kena Zorg</title></head>'
        . '<body style="margin:0;padding:0;background:#F4EBE4">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4EBE4"><tr><td align="center" style="padding:32px 16px">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FBF7F3;border-radius:20px;overflow:hidden">'
        . '<tr><td style="padding:32px 36px 8px"><img src="https://kenazorg.nl/images/kena-logo.png" width="140" alt="Kena Zorg" style="display:block;border:0;height:auto"></td></tr>'
        . '<tr><td style="padding:16px 36px 0;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:30px;line-height:1.15;color:#382C22">Bedankt voor je bericht</td></tr>'
        . '<tr><td style="padding:16px 36px 0;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#59473B">'
        . $hi . '<br><br>Dank je wel voor het invullen van het formulier “' . h($formLabel) . '” op kenazorg.nl. Dit gebeurt er nu:</td></tr>'
        . '<tr><td style="padding:12px 36px 0;font-family:Arial,sans-serif"><table role="presentation" cellpadding="0" cellspacing="0">' . $stepRows . '</table></td></tr>'
        . '<tr><td style="padding:24px 36px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E7D4C8;border-radius:16px"><tr><td style="padding:20px 24px;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#382C22">'
        . '<strong>Is het dringend?</strong> Bel ons dan direct.<br>'
        . '<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px"><tr>'
        . '<td style="border-radius:24px;background:#8A5D44"><a href="tel:+31854013427" style="display:inline-block;padding:12px 22px;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">Bel 085-4013427</a></td>'
        . '</tr></table></td></tr></table></td></tr>'
        . '<tr><td style="padding:28px 36px 32px;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;color:#7D6556">'
        . 'Met vriendelijke groet,<br><span style="font-family:Georgia,serif;font-size:17px;color:#382C22">Kena Zorg</span><br><br>'
        . 'Derkinderenstraat 110A, 1061 VX Amsterdam<br>085-4013427 · 06-28146625 · <a href="mailto:info@kenazorg.nl" style="color:#8A5D44">info@kenazorg.nl</a>'
        . '</td></tr></table>'
        . '<p style="font-family:Arial,sans-serif;font-size:12px;color:#7D6556;margin:16px 0 0">Je ontvangt deze e-mail omdat je een formulier hebt ingevuld op kenazorg.nl.</p>'
        . '</td></tr></table></body></html>';

    $text = ($first !== '' ? "Beste $first," : 'Beste,') . "\n\n"
        . "Dank je wel voor het invullen van het formulier \"$formLabel\" op kenazorg.nl. Dit gebeurt er nu:\n\n"
        . implode("\n", array_map(fn ($i, $s) => ($i + 1) . ". $s", array_keys($steps), $steps))
        . "\n\nIs het dringend? Bel ons direct: 085-4013427 of 06-28146625.\n\n"
        . "Met vriendelijke groet,\nKena Zorg\nDerkinderenstraat 110A, 1061 VX Amsterdam\ninfo@kenazorg.nl\n";

    return [$html, $text];
}
