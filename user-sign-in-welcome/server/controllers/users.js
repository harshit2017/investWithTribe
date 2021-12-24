const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mailUsername,
        pass: process.env.mailPassword
    },
    tls: {
        rejectUnauthorised: false
    }
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        name: body.name,
        email: body.email,
        passwordHash,
    })

    const message = `Hi ${body.name}, \nWelcome to Tribe. Your new account comes with access to Tribe products, apps, and services.\n\nHappy Investing !!\nTribe
    \n\n-----------------------------------------------------------------------------------------------------------------Do Not Reply---------------------------------------------------------------------------------------------------------------------`
    try {
        const savedUser = await newUser.save()

        const mailOptions = {
            from: '"Tribe" <investwithtribe@gmail.com>',
            to: body.email,
            subject: 'Welcome',
            text: message
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })


        res.json(savedUser)
    }
    catch (err) {
        console.log(err)
       return res.status(400).json({ message: 'Email Id already in use' })
    }

})

module.exports = usersRouter