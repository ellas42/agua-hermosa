<?php
// Enhanced debugging
file_put_contents('debug.txt', "=== NEW SUBMISSION ===\n" . date('Y-m-d H:i:s') . "\n" . print_r($_POST, true) . "\n\n", FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Common fields for both trip types
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $date = htmlspecialchars($_POST['date']);
    $adults = htmlspecialchars($_POST['adults']);
    $note = isset($_POST['note']) ? htmlspecialchars($_POST['note']) : '';

    $to = "ellalianaa06@gmail.com";
    $domain = "agua-hermosa.com";
    $fromEmail = "noreply@agua-hermosa.com";

    // Get trip type - be more flexible
    $tripType = isset($_POST['trip-type']) ? $_POST['trip-type'] : 'unknown';
    
    // Log the trip type for debugging
    file_put_contents('debug.txt', "Trip type detected: " . $tripType . "\n", FILE_APPEND);
    
    // Determine trip type more flexibly
    $isFullDayTrip = ($tripType === 'full-day');
    
    if ($isFullDayTrip) {
        // FULL DAY TRIP BOOKING
        file_put_contents('debug.txt', "Processing as FULL DAY TRIP\n", FILE_APPEND);
        
        // Handle accommodation
        $addAccommodation = isset($_POST['add-accommodation']) ? htmlspecialchars($_POST['add-accommodation']) : 'No response';
        $roomType = isset($_POST['room-type']) ? htmlspecialchars($_POST['room-type']) : 'None selected';
        
        // Handle motorbike rental
        $addMotorbike = isset($_POST['add-motorbike']) ? htmlspecialchars($_POST['add-motorbike']) : 'No response';

        $subject = "Agua Hermosa - Full Day Trip Booking from " . $name;
        
        $message = "
        <html>
        <head>
            <title>Full Day Trip Booking Request</title>
        </head>
        <body>
            <h2>Full Day Trip Booking Request - Agua Hermosa</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>
                <tr>
                    <td><strong>Trip Type:</strong></td>
                    <td>Full Day Trip</td>
                </tr>
                <tr>
                    <td><strong>Name:</strong></td>
                    <td>$name</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>$email</td>
                </tr>
                <tr>
                    <td><strong>Phone:</strong></td>
                    <td>$phone</td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td>$date</td>
                </tr>
                <tr>
                    <td><strong>Number of Adults:</strong></td>
                    <td>$adults</td>
                </tr>
                <tr>
                    <td><strong>Add Accommodation:</strong></td>
                    <td>$addAccommodation</td>
                </tr>
                <tr>
                    <td><strong>Room Type:</strong></td>
                    <td>$roomType</td>
                </tr>
                <tr>
                    <td><strong>Add Motorbike Rental:</strong></td>
                    <td>$addMotorbike</td>
                </tr>
                <tr>
                    <td><strong>Note:</strong></td>
                    <td>$note</td>
                </tr>
            </table>
            <p>This email was sent from the Agua Hermosa website - Full Day Trip booking form.</p>
        </body>
        </html>
        ";

    } else {
        // PRIVATE TRIP BOOKING (default for anything that's not full-day)
        file_put_contents('debug.txt', "Processing as PRIVATE TRIP\n", FILE_APPEND);
        
        $addDestinations = isset($_POST['add']) ? implode(", ", array_map('htmlspecialchars', $_POST['add'])) : 'None selected';
        
        // Handle accommodation
        $addAccommodation = isset($_POST['add-accommodation']) ? htmlspecialchars($_POST['add-accommodation']) : 'No response';
        $roomType = isset($_POST['room-type']) ? htmlspecialchars($_POST['room-type']) : 'None selected';
        
        // Handle motorbike rental
        $addMotorbike = isset($_POST['add-motorbike']) ? htmlspecialchars($_POST['add-motorbike']) : 'No response';

        $subject = "Agua Hermosa - Private Trip Booking from " . $name;
        
        $message = "
        <html>
        <head>
            <title>Private Trip Booking Request</title>
        </head>
        <body>
            <h2>Private Trip Booking Request - Agua Hermosa</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>
                <tr>
                    <td><strong>Trip Type:</strong></td>
                    <td>Private Trip (detected: $tripType)</td>
                </tr>
                <tr>
                    <td><strong>Name:</strong></td>
                    <td>$name</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>$email</td>
                </tr>
                <tr>
                    <td><strong>Phone:</strong></td>
                    <td>$phone</td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td>$date</td>
                </tr>
                <tr>
                    <td><strong>Number of Adults:</strong></td>
                    <td>$adults</td>
                </tr>
                <tr>
                    <td><strong>Additional Destinations:</strong></td>
                    <td>$addDestinations</td>
                </tr>
                <tr>
                    <td><strong>Add Accommodation:</strong></td>
                    <td>$addAccommodation</td>
                </tr>
                <tr>
                    <td><strong>Room Type:</strong></td>
                    <td>$roomType</td>
                </tr>
                <tr>
                    <td><strong>Add Motorbike Rental:</strong></td>
                    <td>$addMotorbike</td>
                </tr>
                <tr>
                    <td><strong>Note:</strong></td>
                    <td>$note</td>
                </tr>
            </table>
            <p>This email was sent from the Agua Hermosa website - Private Trip booking form.</p>
        </body>
        </html>
        ";
    }

    // Common headers for both trip types
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Agua Hermosa <$fromEmail>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Return-Path: $fromEmail" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 3" . "\r\n";
    $headers .= "X-MSMail-Priority: Normal" . "\r\n";
    $headers .= "Message-ID: <" . time() . rand(1, 1000) . "@" . $domain . ">" . "\r\n";

    // Log email attempt
    file_put_contents('debug.txt', "Attempting to send email with subject: " . $subject . "\n", FILE_APPEND);

    if (mail($to, $subject, $message, $headers)) {
        $tripTypeName = $isFullDayTrip ? 'Full Day Trip' : 'Private Trip';
        file_put_contents('debug.txt', "Email sent successfully!\n", FILE_APPEND);
        echo "<script>
            alert('Thank you! Your $tripTypeName booking request has been submitted.');
            window.location.href = 'index.html';
        </script>";
    } else {
        file_put_contents('debug.txt', "Email failed to send!\n", FILE_APPEND);
        echo "<script>
            alert('Sorry, there was an error submitting your booking. Please try again.');
            window.location.href = 'index.html';
        </script>";
    }
} else {
    file_put_contents('debug.txt', "Not a POST request\n", FILE_APPEND);
}
?>