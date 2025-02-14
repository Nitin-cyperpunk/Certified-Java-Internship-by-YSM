require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// MongoDB Connection URI
const uri = "mongodb+srv://singhnitin9975:PMSlzXpCAo4yi8U5@cluster0.xxxxxxxx.mongodb.net/enrollmentDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// Define Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  college: { type: String, required: true },
  qualification: { type: String, required: true },
  agree: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create Enrollment Model
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// POST endpoint to handle enrollment data
app.post('/enroll', async (req, res) => {
  const enrollmentData = req.body;

  try {
    const newEnrollment = new Enrollment(enrollmentData);
    const result = await newEnrollment.save();

    console.log(`Enrollment saved with ID: ${result._id}`);
    res.json({ 
      success: true,
      message: 'Enrollment data saved successfully!', 
      id: result._id 
    });

  } catch (err) {
    console.error("Error saving enrollment:", err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to save enrollment data',
      details: err.message 
    });
  }
});

// GET endpoint to retrieve all enrollments
app.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: enrollments
    });
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollments',
      details: err.message
    });
  }
});

// GET endpoint to retrieve a specific enrollment
app.get('/enrollment/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }
    res.json({
      success: true,
      data: enrollment
    });
  } catch (err) {
    console.error("Error fetching enrollment:", err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollment',
      details: err.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
