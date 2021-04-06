const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const exphbs = require('express-handlebars');
const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('./database/knexfile');
require('dotenv').config()

// Objection Setup
const db = knex(knexfile.production);
Model.knex(db);

// CORS
app.use(cors());

// Cookie Parser
app.use(cookieparser());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Views path
app.set('views', path.join(__dirname, 'views'))

// Set template engine
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

// Redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/signup', (req, res) => {
    res.render('signup', { layout: 'out.hbs' });
});

app.get('/new', (req, res) => {
    res.render('tasks/add');
});

app.get('/edit', (req, res) => {
    res.render('tasks/edit');
});



// Routes Array
const routes = [
    'login',
    'tasks',
    'users',
    'logout'
]

// Require routes
const setRoute = routes => {
    routes.forEach(route => {
        app.use(`/${route}`, require(`./routes/${route}`));
    })
}

setRoute(routes);

// Init server
app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));