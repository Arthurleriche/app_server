const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        title: "je suis get/users"
    })
})

module.exports = router