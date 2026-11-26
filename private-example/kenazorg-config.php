<?php
// Kopieer dit bestand naar /private/kenazorg-config.php op de server (naast httpdocs, NIET in httpdocs).
// Vul het SMTP-wachtwoord zelf in via Plesk; zet het nooit in de repo.
return [
    'recipient'  => 'info@kenazorg.nl',
    'recipients' => [
        // 'aanmelding'   => 'aanmelding@kenazorg.nl',
        // 'sollicitatie' => 'administratie@kenazorg.nl',
    ],
    'from_email' => 'noreply@kenazorg.nl',
    'from_name'  => 'Kena Zorg website',
    'allowed_hosts' => ['kenazorg.nl', 'www.kenazorg.nl', 'new.kenazorg.nl'],
    'smtp' => [
        'host'   => '',      // bv. de mailserver van de hosting of smtp.office365.com
        'port'   => 587,
        'secure' => 'tls',   // 'tls' (STARTTLS, poort 587) of 'ssl' (poort 465)
        'user'   => 'noreply@kenazorg.nl',
        'pass'   => '',      // invullen op de server
    ],
];
