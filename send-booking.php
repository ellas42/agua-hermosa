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
    $subject = "Agua Hermosa -- New Booking Request from $name";

    $message = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        Date: $date\n
        Number of Adults: $adults\n
        \n
        Change Default Destinations?: $changeDestinations\n
        Replace Destinations: $replace\n
        Additional Destinations: $additional\n
        \n
        Note: $note
    ";

    $headers = "From: $email";

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
