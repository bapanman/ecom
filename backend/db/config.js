const mongoose= require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongodb_url = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNANE}:${process.env.DB_PASSWORD}@ecom-cluster.bkubgim.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongodb_url)

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});