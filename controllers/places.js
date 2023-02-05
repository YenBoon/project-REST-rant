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
    res.send('GET /places/:id stub')
  })

// DELETE
router.delete('/:id', (req, res) => {
  res.send('DELETE /places/:id stub')
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
  res.send('GET edit form stub')
});

// PUT
router.put('/:id', (req, res) => {
  res.send('PUT /places/:id stub')
})

router.post('/:id/rant', (req, res) =>{
  res.send('GET /places/:id/rant stub')
})

router.delete('/:id/rant/:rantId', (req, res) => {
  res.send('GET /places/:id/rant/:rantId stub')
})

module.exports = router