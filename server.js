const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
require('dotenv').config();
const app = express();
//config db
connectDB();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/client/build'));
}
//middleware
app.use(cors());
app.use(express.json({ extended: false }));

//config routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
//   });

//running server
const port = process.env.PORT || process.env.PORTL || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
