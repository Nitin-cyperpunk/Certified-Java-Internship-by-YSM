<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'testdb');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$city = $_POST['city'];
$clg_name = $_POST['clg_name'];
$qualification = $_POST['qualification'];
$campaign = $_POST['campaign'];

// Check if the checkbox is checked
$campaign = isset($_POST['campaign']) ? 'Yes' : 'No';

// Insert data into MySQL
$sql = "INSERT INTO form_data (name, phone, Email, City, Colleges, qualification, campaign) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $name, $phone, $email, $city, $clg_name, $qualification, $campaign);

if ($stmt->execute()) {
    echo "Data saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
