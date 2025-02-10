const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');  // Or const { MongoClient } = require('mongodb'); if not using Mongoose

const app = express();
const port = 3000;

// Enable CORS (for local development; configure properly in production)
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// MongoDB Connection URI - replace with your actual connection string
const uri = "mongodb://singhnitin9975:<PMSlzXpCAo4yi8U5>@<hostname>/?ssl=true&replicaSet=atlas-g7z2sa-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"; // Local MongoDB
// const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/your_database_name?retryWrites=true&w=majority"; // MongoDB Atlas

// --- Option 1:  Using Mongoose (Recommended) ---
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to MongoDB (Mongoose)"))
  .catch(err => console.error("Failed to connect to MongoDB (Mongoose)", err));

// Define a Mongoose Schema and Model (e.g., for Enrollments)
const enrollmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  city: String,
  college: String,
  qualification: String,
  agree: Boolean
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);


// --- Option 2:  Using the MongoDB Driver directly (without Mongoose) ---
/*
const { MongoClient } = require('mongodb');  // Uncomment if *not* using Mongoose

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB (MongoClient)");

    const db = client.db('your_database_name');  // Replace with your database name
    const enrollments = db.collection('enrollments'); // Replace with your collection name

    // ... (The app.post('/enroll') route would go here - see below)

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run().catch(console.dir);
*/


// POST endpoint to handle enrollment data
app.post('/enroll', async (req, res) => {
  const enrollmentData = req.body;

  try {
    // --- Option 1: Using Mongoose ---
    const newEnrollment = new Enrollment(enrollmentData);  // Create a new Enrollment document
    const result = await newEnrollment.save();   // Save it to the database

    // --- Option 2: Using the MongoDB Driver directly ---
    // const result = await enrollments.insertOne(enrollmentData);  // If not using Mongoose


    console.log(`Inserted with _id: ${result._id}`);  // Using Mongoose
    // console.log(`Inserted with _id: ${result.insertedId}`);  // If not using Mongoose
    res.json({ message: 'Enrollment data saved!', id: result._id }); // Mongoose returns _id
    // res.json({ message: 'Enrollment data saved!', id: result.insertedId }); // If not using Mongoose

  } catch (err) {
    console.error("Error inserting document:", err);
    res.status(500).json({ error: 'Failed to save enrollment data' });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${3000}`);
});
