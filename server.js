// Imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Quote = require('./models/quoteScheme');
const methodOverride = require("method-override");

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

// Database
require('./config/database.js');

// Restful routing

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/quotes/new', (req, res, next) => {
    res.render('quotes/new.ejs');
});

app.post('/quotes', async (req, res) => {
    await Quote.create(req.body);
    res.redirect('/quotes');
});

app.get('/quotes', async (req, res) => {
    const quotes = await Quote.find();
    res.render('quotes/index.ejs', { 
        quotes });
});

app.get('/quotes/:quoteId', async (req, res) => {
    const quote = await Quote.findById(req.params.quoteId);
    res.render('quotes/show.ejs', { 
        quote });
});

app.delete('/quotes/:quoteId' , async (req, res) =>{
   await Quote.findByIdAndDelete(req.params.quoteId)
   res.redirect('/quotes')
})

app.get('/quotes/:quoteId/edit', async (req, res) => {
    const foundQuote = await Quote.findById(req.params.quoteId);
    res.render('quotes/edit.ejs', {
        quote: foundQuote,
    });
});

app.put('/quotes/:quoteId', async (req, res) => {
    await Quote.findByIdAndUpdate(req.params.quoteId, req.body);
    res.redirect(`/quotes/${req.params.quoteId}`);
});


app.listen(3000, () => {
    console.log('Listening on Port 3000');
});