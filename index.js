const express = require('express');
require('./config/db')();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/user');

//----------Middlewares-------- ORDER is important
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', authRoutes);
// app.use('/api', userRoutes);

//heroku production environment setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`));
