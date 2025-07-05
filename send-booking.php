<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $date = htmlspecialchars($_POST['date']);
    $adults = htmlspecialchars($_POST['adults']);
    $note = htmlspecialchars($_POST['note']);

    // Handle change-destinations
    $changeDestinations = isset($_POST['change-destinations']) ? htmlspecialchars($_POST['change-destinations']) : 'No response';

    // Handle replace destinations
    $replace = isset($_POST['replace']) ? implode(", ", array_map('htmlspecialchars', $_POST['replace'])) : 'None';

    // Handle additional destinations
    $additional = isset($_POST['additional-destinations']) ? implode(", ", array_map('htmlspecialchars', $_POST['additional-destinations'])) : 'None';

    $to = "ellalianaa06@gmail.com"; 
    $subject = "Agua Hermosa - New Booking Request from " . $name;

    // Create HTML email content
    $message = "
    <html>
    <head>
        <title>New Booking Request</title>
    </head>
    <body>
        <h2>New Booking Request - Agua Hermosa</h2>
        <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>
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
                <td><strong>Change Default Destinations:</strong></td>
                <td>$changeDestinations</td>
            </tr>
            <tr>
                <td><strong>Replace Destinations:</strong></td>
                <td>$replace</td>
            </tr>
            <tr>
                <td><strong>Additional Destinations:</strong></td>
                <td>$additional</td>
            </tr>
            <tr>
                <td><strong>Note:</strong></td>
                <td>$note</td>
            </tr>
        </table>
        <p>This email was sent from the Agua Hermosa website contact form.</p>
    </body>
    </html>
    ";

    // Use your specific noreply email
    $domain = "agua-hermosa.com";
    $fromEmail = "noreply@agua-hermosa.com";
    
    // Improved headers to prevent spam flagging
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Agua Hermosa <$fromEmail>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Return-Path: $fromEmail" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 3" . "\r\n";
    $headers .= "X-MSMail-Priority: Normal" . "\r\n";
    $headers .= "Message-ID: <" . time() . rand(1, 1000) . "@" . $domain . ">" . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<script>
            alert('Thank you! Your booking request has been submitted.');
            window.location.href = 'index.html';
        </script>";
    } else {
        echo "<script>
            alert('Sorry, there was an error submitting your booking. Please try again.');
            window.location.href = 'index.html';
        </script>";
    }
}
?>