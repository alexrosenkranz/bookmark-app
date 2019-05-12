const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extneded: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const mongoUri = 'mongodb://localhost/jwt-auth';
mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongoUri}`);
  }
});

const routes = require('./routes');

app.use(routes);

app.listen(PORT, () => console.log(`🌏 => On http://localhost:${PORT}`));
