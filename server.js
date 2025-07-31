const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect("mongodb+srv://prachigupta24:Prachi2424@cluster1.g0qleol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mongoose Schema
const ContactSchema = new mongoose.Schema({
  email: String,
  message: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

// API route to handle contact form submissions
app.post('/contact', async (req, res) => {
  const { email, message } = req.body;
  try {
    const newContact = new Contact({ email, message });
    await newContact.save();
    res.status(200).json({ message: 'Contact saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Serve index page (task2.html) by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'task2.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
