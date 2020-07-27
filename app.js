const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const actionRoutes = require('./routes/actions');
const searchRoutes = require('./routes/search');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/actions', actionRoutes);
app.use(searchRoutes);

app.listen(3000);