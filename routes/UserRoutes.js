const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcript = require('bcryptjs')
const jwtSecret = 'secretdude'

router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcript.genSalt(10)
        const hashPassword = await bcript.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: hashPassword,
                date: req.body.date,
            })
            res.json({
                success: true,
                result: {
                    name: req.body.name,
                    location: req.body.location,
                    email: req.body.email,
                    password: req.body.password,
                    date: req.body.date,
                }
            })
        } catch (err) {
            console.log(err)
            res.json({
                success: false
            })
        }
    })

router.post('/login', [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    ],   
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const email = req.body.email
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: 'Email is invaild' })
            }

            const comparePW = await bcript.compare(req.body.password, user.password)
            if (!comparePW) {
                return res.status(400).json({ errors: 'Password is invaild' })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)
            res.json({ success: true, token: authToken })
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })

module.exports = router