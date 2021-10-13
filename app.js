const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', beersFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      res.render('random-beer', randomBeerFromApi[0]);
    })
    .catch(error => console.log(error));
});

app.get('/specific-beer', (req, res) => {
  punkAPI
    .getBeers('id')
    .then(beersIdFromApi => {
      console.log(beersIdFromApi.id);
      // console.log(beersIdFromApi);
      res.render('specific-beer', beersIdFromApi);
    })
    .catch(error => console.log(error));
});

app.listen(3001, () => console.log('🏃‍ on port 3001'));
