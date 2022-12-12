const express = require("express");
const connectDB = require('./config/db')
const dotenv = require('dotenv')

const app = express();
dotenv.config();
// connect to database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use('/',require('./routes/index'))
app.use('/api/url',require('./routes/url'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
