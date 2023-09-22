
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
dotenv.config()
const PORT = process.env.PORT || 3000;
const cors = require('cors'); // Import CORS

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const dataSchema = new mongoose.Schema({
  name: String,
  time: Number,
});

const Data = mongoose.model('Data', dataSchema);

app.use(express.json());
app.use(cors()); // Use CORS middleware

app.post('/api/data', async (req, res) => {
  const { name, time } = req.body;
  try {
    const newData = new Data({ name, time });
    await newData.save();
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving data' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find();
    allData.sort((a, b) => a.time - b.time);
    res.json({ success: true, data: allData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

