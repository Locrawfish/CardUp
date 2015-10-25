var express = require('express');
var router = express.Router();
var card = require('../models/card');

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

//INDEX
router.get('/', authenticate, function(req, res, next) {
  var cards = global.currentUser.cards;
  res.render('cards/index', { cards: cards, message: req.flash() })
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var card = {
    name: '',
    title: '',
    company: '',
    phone: {
      cell: '',
      work: ''
    },
    email: '',
    linkedIn: '',
    website: ''
    };
  res.render('cards/new', { card: card, message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var card = currentUser.cards.id(req.params.id);
  if (!card) return next(makeError(res, 'Document not found', 404));
  res.render('cards/show', { card: card, message: req.flash() } );
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var card = currentUser.cards.id(req.params.id);
  if (!card) return next(makeError(res, 'Document not found', 404));
  res.render('cards/edit', { card: card, message: req.flash() } );
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var card = {
    name: req.body.name,
    title: req.body.title,
    company: req.body.company,
    phone: {
      cell: req.body.cell,
      work: req.body.work
    },
    email: req.body.email,
    linkedIn: req.body.linkedIn,
    website: req.body.website
  };
  // card.create(card, function(err, saved) {
  currentUser.cards.push(card);
  currentUser.save(function (err) {
    if (err) return next(err);
    res.redirect('/cards');
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var card = currentUser.cards.id(req.params.id);
  if (!card) return next(makeError(res, 'Document not found', 404));
  else {
    card.name = req.body.name;
    card.title = req.body.title;
    card.company = req.body.company;
    card.phone.cell = req.body.cell;
    card.phone.work = req.body.work;
    card.email = req.body.email;
    card.linkedIn = req.body.linkedIn;
    card.website = req.body.website;
    currentUser.save(function(err) {
      if (err) return next(err);
      res.redirect('/cards');
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var card = currentUser.cards.id(req.params.id);
  if (!card) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.cards.indexOf(card);
  currentUser.cards.splice(index, 1);
  currentUser.save(function(err) {
    if (err) return next(err);
    res.redirect('/cards');
  });
});

module.exports = router;
