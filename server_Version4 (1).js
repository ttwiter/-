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