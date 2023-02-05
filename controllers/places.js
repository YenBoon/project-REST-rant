const router = require('express').Router()
const places = require('../models/places.js')
const db = require('../models')

// Get /places
router.get('/', (req, res) => {
    db.Place.find()
    .then((places) => {
      res.render('places/index', {places})
    })
    .catch(err => {
      console.log(err)
      res.render('error404')
    })
})

// Get /places/new
router.get('/new', (req, res) => {
    res.render('places/new')
})

// SHOW
router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .populate('comments')
  .then(place => {
    console.log(place.comments)
      res.render('places/show', { place, id: req.params.id })
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

// DELETE
router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
  .then(deletedPlace => {
    res.status(303).redirect('/places')
  })
})

// POST
router.post('/', (req, res) => {
  db.Place.create(req.body)
  .then(() => {
      res.redirect('/places')
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

// edit
router.get("/:id/edit", (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
      res.render('places/edit', { place, id: req.params.id })
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
});


// PUT
router.put('/:id', (req, res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body)
  .then (updatedPlace => {
    res.redirect(`/places/${req.params.id}`)
  })
})

router.post('/:id/rant', (req, res) =>{
  res.send('GET /places/:id/rant stub')
})

router.delete('/:id/rant/:rantId', (req, res) => {
  res.send('GET /places/:id/rant/:rantId stub')
})

module.exports = router