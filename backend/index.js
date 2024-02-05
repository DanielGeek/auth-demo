const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// Database connection
dbConnection();

app.use(cors());

// Public Directory
app.use(express.static('public'));

// Reading and parsing the body
app.use(express.json());

// Routes
app.use('/api', require('./routes/employees'));
app.use('/api', require('./routes/departments'));
app.use('/api', require('./routes/departments_history'));

// Listen for requests
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
