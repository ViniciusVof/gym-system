const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const app = express();

require('dotenv').config({path: './environments'});

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);