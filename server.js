const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('.'));
app.use(express.json());

// Endpoint kolom iklan/pengumuman
app.get('/iklan.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'iklan.json'), (err, data) => {
    if (err) return res.json([]);
    res.type('json').send(data);
  });
});
// Tambahkan di bawah endpoint iklan.json di server.js

// Endpoint untuk GET slide promosi
app.get('/slide.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'slide.json'), (err, data) => {
    if (err) return res.json([]);
    res.type('json').send(data);
  });
});

// Endpoint untuk POST slide promosi
app.post('/slide.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'slide.json'), (err, data) => {
    let slides = [];
    if (!err && data.length) slides = JSON.parse(data);
    if (req.body.deleteIdx !== undefined) {
      slides.splice(req.body.deleteIdx, 1);
    } else {
      slides.unshift(req.body);
    }
    fs.writeFile(
      path.join(__dirname, 'slide.json'),
      JSON.stringify(slides, null, 2),
      err => {
        if (err) return res.status(500).json({error: "Gagal simpan"});
        res.json({success: true});
      }
    );
  });
});

app.post('/iklan.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'iklan.json'), (err, data) => {
    let iklan = [];
    if (!err && data.length) iklan = JSON.parse(data);
    if (req.body.deleteIdx !== undefined) {
      iklan.splice(req.body.deleteIdx, 1);
    } else {
      iklan.unshift(req.body);
    }
    fs.writeFile(
      path.join(__dirname, 'iklan.json'),
      JSON.stringify(iklan, null, 2),
      err => {
        if (err) return res.status(500).json({error: "Gagal simpan"});
        res.json({success: true});
      }
    );
  });
});

app.use(express.static('.'));
app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));
