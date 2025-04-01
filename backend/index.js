const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');


require('dotenv').config();
require('./Models/Database');
 

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(cors());

app.use('/auth',AuthRouter);
  

app.get('/', (req, res) => {
    res.send('Hello from the server!');
}) 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));