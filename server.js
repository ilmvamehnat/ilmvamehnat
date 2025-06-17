const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'applications.json');

app.use(cors());
app.use(express.json());

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

app.post('/save', (req, res) => {
  try {
    const newApp = req.body;
    const existing = JSON.parse(fs.readFileSync(DATA_FILE));
    existing.push(newApp);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));
    res.status(200).send({ message: 'Saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/applications', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
