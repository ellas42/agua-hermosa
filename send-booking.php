<?php

file_put_contents('debug.txt', "=== NEW SUBMISSION ===\n" . date('Y-m-d H:i:s') . "\n" . print_r($_POST, true) . "\n\n", FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Helpers
    $h = fn($v) => htmlspecialchars($v ?? '', ENT_QUOTES, 'UTF-8');

    $name   = $h($_POST['name'] ?? '');
    $email  = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
    $phone  = $h($_POST['phone'] ?? '');
    $date   = $h($_POST['date'] ?? '');
    $adults = $h($_POST['adults'] ?? '');
    $note   = $h($_POST['note'] ?? '');

    $to        = "ellalianaa06@gmail.com";
    $domain    = "agua-hermosa.com";
    $fromEmail = "noreply@agua-hermosa.com";

    // Normalize trip type robustly
    $rawTripType = $_POST['trip-type'] ?? '';
    $tripToken = strtolower(trim((string)$rawTripType));
    $tripToken = str_replace(['_', ' '], '-', $tripToken);

    // Explicit mapping
    $tripMap = [
        'full-day'   => 'full-day',
        'full'       => 'full-day',
        'fullday'    => 'full-day',
        'full-day-trip' => 'full-day',
        'private'    => 'private',
        'custom'     => 'private',
        'private-trip' => 'private',
    ];
    $tripResolved = $tripMap[$tripToken] ?? 'unknown';

    file_put_contents('debug.txt', "Trip type raw: {$rawTripType} | token: {$tripToken} | resolved: {$tripResolved}\n", FILE_APPEND);

    $isFullDayTrip = ($tripResolved === 'full-day');

    if ($isFullDayTrip) {
        file_put_contents('debug.txt', "Processing as FULL DAY TRIP\n", FILE_APPEND);

        $addAccommodation = $h($_POST['add-accommodation'] ?? 'No response');
        $roomType         = $h($_POST['room-type'] ?? 'None selected');
        $addMotorbike     = $h($_POST['add-motorbike'] ?? 'No response');

        $subject = "Agua Hermosa - Full Day Trip Booking from {$name}";

        $message = "
        <html>
        <head><title>Full Day Trip Booking Request</title></head>
        <body>
            <h2>Full Day Trip Booking Request - Agua Hermosa</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse:collapse;'>
                <tr><td><strong>Trip Type:</strong></td><td>Full Day Trip</td></tr>
                <tr><td><strong>Name:</strong></td><td>{$name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{$h($email)}</td></tr>
                <tr><td><strong>Phone:</strong></td><td>{$phone}</td></tr>
                <tr><td><strong>Date:</strong></td><td>{$date}</td></tr>
                <tr><td><strong>Number of Adults:</strong></td><td>{$adults}</td></tr>
                <tr><td><strong>Add Accommodation:</strong></td><td>{$addAccommodation}</td></tr>
                <tr><td><strong>Room Type:</strong></td><td>{$roomType}</td></tr>
                <tr><td><strong>Add Motorbike Rental:</strong></td><td>{$addMotorbike}</td></tr>
                <tr><td><strong>Note:</strong></td><td>{$note}</td></tr>
            </table>
            <p>This email was sent from the Agua Hermosa website - Full Day Trip booking form.</p>
        </body>
        </html>";
    } else {
        file_put_contents('debug.txt', "Processing as PRIVATE TRIP\n", FILE_APPEND);

        $addDestinations = 'None selected';
        if (isset($_POST['add']) && is_array($_POST['add'])) {
            $addDestinations = implode(", ", array_map($h, $_POST['add']));
        }

        $addAccommodation = $h($_POST['add-accommodation'] ?? 'No response');
        $roomType         = $h($_POST['room-type'] ?? 'None selected');
        $addMotorbike     = $h($_POST['add-motorbike'] ?? 'No response');

        $subject = "Agua Hermosa - Private Trip Booking from {$name}";

        $message = "
        <html>
        <head><title>Private Trip Booking Request</title></head>
        <body>
            <h2>Private Trip Booking Request - Agua Hermosa</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse:collapse;'>
                <tr><td><strong>Trip Type:</strong></td><td>Private Trip (detected: {$h($rawTripType)})</td></tr>
                <tr><td><strong>Name:</strong></td><td>{$name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{$h($email)}</td></tr>
                <tr><td><strong>Phone:</strong></td><td>{$phone}</td></tr>
                <tr><td><strong>Date:</strong></td><td>{$date}</td></tr>
                <tr><td><strong>Number of Adults:</strong></td><td>{$adults}</td></tr>
                <tr><td><strong>Additional Destinations:</strong></td><td>{$addDestinations}</td></tr>
                <tr><td><strong>Add Accommodation:</strong></td><td>{$addAccommodation}</td></tr>
                <tr><td><strong>Room Type:</strong></td><td>{$roomType}</td></tr>
                <tr><td><strong>Add Motorbike Rental:</strong></td><td>{$addMotorbike}</td></tr>
                <tr><td><strong>Note:</strong></td><td>{$note}</td></tr>
            </table>
            <p>This email was sent from the Agua Hermosa website - Private Trip booking form.</p>
        </body>
        </html>";
    }

    // Headers
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: Agua Hermosa <{$fromEmail}>\r\n";
    if ($email) { $headers .= "Reply-To: {$email}\r\n"; }
    $headers .= "Return-Path: {$fromEmail}\r\n";
    $headers .= "X-Mailer: PHP/".phpversion()."\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-MSMail-Priority: Normal\r\n";
    $headers .= "Message-ID: <".time().rand(1,1000)."@{$domain}>\r\n";

    file_put_contents('debug.txt', "Attempting to send email with subject: {$subject}\n", FILE_APPEND);

    if (mail($to, $subject, $message, $headers)) {
        $tripTypeName = $isFullDayTrip ? 'Full Day Trip' : 'Private Trip';
        file_put_contents('debug.txt', "Email sent successfully!\n", FILE_APPEND);
        echo "<script>alert('Thank you! Your {$tripTypeName} booking request has been submitted.');window.location.href='index.html';</script>";
    } else {
        file_put_contents('debug.txt', "Email failed to send!\n", FILE_APPEND);
        echo "<script>alert('Sorry, there was an error submitting your booking. Please try again.');window.location.href='index.html';</script>";
    }
} else {
    file_put_contents('debug.txt', "Not a POST request\n", FILE_APPEND);
}
?>