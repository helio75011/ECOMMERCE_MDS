require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')

const app = express();
const port = 4612;

//Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect to MongoDB
// Si vous n'avez pas le console.log, vérifiez d'installer MondoDB Community Server et de le lancer en local !
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');})
.catch(err => {
  console.error('Error connecting to MongoDB', err);});

app.listen(port, () => {
  console.log(`Server online at http://localhost:${port}`);
});