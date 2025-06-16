// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = 'applications.json';

app.use(cors());
app.use(bodyParser.json());

app.post('/save', (req, res) => {
  const newApp = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let apps = [];
    if (!err && data) {
      apps = JSON.parse(data);
    }
    apps.push(newApp);
    fs.writeFile(DATA_FILE, JSON.stringify(apps, null, 2), (err) => {
      if (err) return res.status(500).send('Хатолик юз берди');
      res.status(200).send('Сақланди');
    });
  });
});

app.get('/applications', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send([]);
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
