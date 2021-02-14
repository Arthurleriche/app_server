const express = require('express')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// import le model USER
const User = require('../../models/User')

// les routes
router.get('/', (req, res) => {
    res.send({
        title: "je suis get/users"
    })
})

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required nad must have more than 6 characters').isLength({min: 6})
], async (req, res) => {
        
    const errors = validationResult(req)
        
    if(!errors.isEmpty()){
        console.log('erreur dans les checks')
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(user){
           return res.status(400).json({errors: [{msg: 'user already exist'}]})
        }

        user = new User({name, email, password})

        // cryptage du Password
        const salt = await bycrypt.genSalt(10)
        user.password = await bycrypt.hash(password, salt)

        // enregistrement du users
        await user.save()
        
        const payload = {
            user: {
                id: user._id          
            }
        }

        jwt.sign(
            payload,
            config.get('jwt'),
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw error
                res.json({token})
        })

    } catch (error) {
        
    }
})

module.exports = router