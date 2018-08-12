const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'loops')))

app.listen(5000, () => console.log('Example app listening on port 5000!'))
