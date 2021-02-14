const express = require('express')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500)
    }
})

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
        
    const errors = validationResult(req)
        
    if(!errors.isEmpty()){
        console.log('erreur dans les checks')
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(!user){
           return res.status(400).json({errors: [{msg: 'must registred'}]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'password is not the good one'}]})
        }

        const payload = {
            user: {
                id: user._id          
            }
        }

        // creation du jwt
        jwt.sign(
            payload,
            config.get('jwt'),
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw error
                res.json({token})
        })

    } catch (error) {
        res.status(500).send('not working')
        console.error({msg: "ooops"})
    }
})

module.exports = router