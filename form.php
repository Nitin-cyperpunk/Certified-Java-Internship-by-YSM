<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "enrollmentDB";


$conn = new mysqli('localhost', 'root', '', enrollmentDB);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$city = $_POST['city'];
$college = $_POST['college'];
$qualification = $_POST['qualification'];
$agree = isset($_POST['agree']) ? 1 : 0;

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO enrollments (name, phone, email, city, college, qualification, agree) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssi", $name, $phone, $email, $city, $college, $qualification, $agree);

// Execute the query
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
