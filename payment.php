<?php
// Database connection parameters
$host = "localhost";
$username = "root";
$password = ""; // If you have set a password for your database, include it here
$database = "travel_db";

// Establish database connection
$conn = new mysqli($name, $card_number, $expiry_date, $cvv, $amount);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $cardNumber = $_POST["card_number"];
    $expiryDate = $_POST["expiry_date"];
    $cvv = $_POST["cvv"];
    $amount = $_POST["amount"];

    // Insert data into database
    $sql = "INSERT INTO payments (name, card_number, expiry_date, cvv, amount) VALUES ('$name', '$cardNumber', '$expiryDate', '$cvv', '$amount')";

    if ($conn->query($sql) === TRUE) {
        echo "Payment processed successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        echo '<script>window.location.href = "./index.";</script>';
    }
}

// Close database connection
$conn->close();
?>
