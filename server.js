const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));


app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/AdApp', 
        mongooseConnection: mongoose.connection,
        resave: false, 
        saveUnintialized: false
      }),
    })
  );

// const userRoutes = require('./routes/users.routes');
const adRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');


// app.use('/api', userRoutes); 
app.use('/api', adRoutes); 
app.use('/auth', authRoutes); 



app.get('/', (req, res) => {
    res.render('/index');
});



const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

  

// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/AdApp', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));

