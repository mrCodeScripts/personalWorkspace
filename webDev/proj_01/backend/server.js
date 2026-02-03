const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});