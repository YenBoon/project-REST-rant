const router = require('express').Router()

// More code here in a moment
router.get('/', (req, res) => {
    res.render('GET /places')
})

module.exports = router
