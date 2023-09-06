const mongoose= require('mongoose');

mongodb_url = '\mongodb+srv://bapmon78:ZPeJZW0E9IRbs6Z9@ecom-cluster.bkubgim.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongodb_url)

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});