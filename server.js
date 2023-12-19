const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';  
if (NODE_ENV === 'production') dbUri = 'mongodb+srv://tomekcichon03005:Atlas1212@cluster0.alnb1dj.mongodb.net/AdDB?retryWrites=true&w=majority';
else dbUri = 'mongodb://0.0.0.0:27017/AdApp';

app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({
        mongoUrl: dbUri, 
        mongooseConnection: mongoose.connection,
        resave: false, 
        saveUnintialized: false
      }),
    })
  );

const adRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');


// app.use('/api', userRoutes); 
app.use('/api', adRoutes); 
app.use('/auth', authRoutes); 





  
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
  
  app.use((req, res) => {
    res.status(404).send('404 not found...');
  });
  


  
  module.exports = server;