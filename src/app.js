const express = require('express');
const path = require("path");

const PORT = 5000;

const app = express();

app.listen(PORT, () => console.log('server started on PORT:', PORT));