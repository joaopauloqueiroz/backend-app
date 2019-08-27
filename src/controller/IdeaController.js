const axios = require('axios')
const Idea = require('../models/Idea')

module.exports = {
    async store(req, res) {
        const { text, emotion, user } = req.body
        try {
            const idea = await Idea.create({
                text,
                emotion,
                user
            })
            return res.json(idea)
        } catch (error) {
            return res.status(500).send({error: 'Error on create idea'})
        }
    },
    async index(req, res) {
        const { id } = req.body
        try {
            const ideas = await Idea.find({
                "user": id
            }).skip(0).limit(10)
            return res.json(ideas)
        } catch (error) {
            return res.json({ error: 'Error on get ideas' })
        }
    },
    async destroy(req, res) {
        const { _id } = req.params
        const idea = await Idea.findByIdAndDelete({ _id })
        return res.status(200).send({ deleted: 'success' })
    }
}