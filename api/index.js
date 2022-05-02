const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('livro.pdf', (err) => {
    if(err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
})

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/livro.pdf`);
})

