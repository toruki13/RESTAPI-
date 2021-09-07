const path = require('path');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

/*routes import*/
const postsRoutes = require('./routes/feed');

const app = express();

app.use(cors());

app.use(morgan('tiny'));

app.use(express.json({ limit: '5mb' }));

/* app.use(express.urlencoded({ extended: false, limit: '20mb' })); no need as no body form */
/* app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'no exploiters on my land ;)');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); //this wont block nothing 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next(); 
}); */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/feed', postsRoutes);
app.use((error, req, res, next) => {
  const { statusCode, message } = error;
  res.status(statusCode||500).json({ message });
});

const port = process.env.PORT || 9080;

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
