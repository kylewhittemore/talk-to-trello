const express = require('express')
const app = express();

require('dotenv').config()

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const routes = require('./routes')

app.use('/', routes)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));