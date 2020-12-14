const express = require('express');
const mongoose = require('mongoose');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/populatedb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);


// Retrieve all users
app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
