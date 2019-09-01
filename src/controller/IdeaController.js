const axios = require('axios')
const Idea = require('../models/Idea')

module.exports = {
    async store(req, res) {
        const { text, emotion, user, date } = req.body
        try {
            const idea = await Idea.create({
                text,
                emotion,
                user,
                date
            })
            return res.json(idea)
        } catch (error) {
            return res.status(500).send({error: 'Error on create idea'})
        }
    },
    async index(req, res) {
        const { id } = req.params
        try {
            const ideas = await Idea.find({
                "user": id
            }).skip(0).limit(10)
            return res.send(ideas)
        } catch (error) {
            return res.json({ error: 'Error on get ideas' })
        }
    },
    async destroy(req, res) {
        const { _id } = req.params
        const idea = await Idea.findOneAndDelete({ _id })
        return res.status(200).send({ deleted: 'success' })
    },
    async edit(req, res) {
        
        delete req.body.createdAt
        delete req.body.updatedAt
        const { _id } = req.body
        delete req.body._id
        console.log(req.body._id)
       const idea = await Idea.updateOne({_id: _id}, req.body)
       res.status(201).send({updated: 'success'})
    }
}