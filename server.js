const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const path = require('path');
require('dotenv/config');

//IMPORT ROUTES
const postsRoute = require('./routes/posts');
const todosRoute = require('./routes/todos');

app.use(cors());
app.use(bodyParser.json());

//MIDDLEWARE FOR ROUTES
app.use('/posts', postsRoute);
app.use('/todos', todosRoute);

//HOME ROUTE
app.use(express.static('public'));

/*app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});*/

app.get('/', (req, res) => {
  res.send('We are on home');
});

// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connect to DB');
});

app.listen(port, () => console.log(`server running on port ${port}`));