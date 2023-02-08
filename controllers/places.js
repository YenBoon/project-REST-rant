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

router.post('/', (req, res) => {
  if (req.body.pic === '') { req.body.pic = undefined }
  if (req.body.city === '') { req.body.city = undefined }
  if (req.body.state === '') { req.body.state = undefined }
  db.Place.create(req.body)
      .then(() => {
          res.redirect('/places')
      })
      .catch(err => {
          if (err && err.name == 'ValidationError') {
              let message = 'Validation Error: '
              for (var field in err.errors) {
                  message += `${field} was ${err.errors[field].value}. ${err.errors[field].message}\n`
              }
              res.render('places/new', { message })
          }
          else {
              res.render('error404')
          }
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

// PUT
router.put('/:id', (req, res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body)
  .then (updatedPlace => {
    res.redirect(`/places/${req.params.id}`)
  })
  .catch (err => {
    console.log('err', err)
    res.render('error404')
  })
})

// DELETE
router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
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

// Comment
router.post('/:id/comment', (req, res) => {
  console.log(req.body)
  db.Place.findById(req.params.id)
  .then(place => {
      db.Comment.create(req.body)
      .then(comment => {
          place.comments.push(comment.id)
          place.save()
          .then(() => {
              res.redirect(`/places/${req.params.id}`)
          })
      })
      .catch(err => {
          res.render('error404')
      })
  })
  .catch(err => {
      res.render('error404')
  })
})

// Delete
router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
  .then(place => {
      res.redirect('/places')
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

router.delete('/:id/comment/:commentId', (req, res) => {
  db.Comment.findByIdAndDelete(req.params.commentId)
  .then(() => {
    console.log('Success')
    res.redirect(`/places/${req.params.id}`)
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})

module.exports = router