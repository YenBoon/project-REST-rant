const router = require('express').Router()

// More code here in a moment
router.get('/new', (req, res) => {
    res.render('places/new')
})

module.exports = router
