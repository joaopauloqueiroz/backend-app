const axios = require('axios')
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { name, username, password } = req.body
        let userExists = await User.findOne({ username: username })
        console.log(userExists)
        if(userExists){
           return res.status(400).send({error: 'User exist'})
        }

        try {
            const user = await User.create({
                name,
                username,
                password
            })

            return res.json(user)

        } catch (error) {
            return res.json({ error: 'Error on create user' })
        }
    }
}