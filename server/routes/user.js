const express = require('express')
const router = express.Router()

const {User} = require('../models/user')

const _ = require('lodash')

router.post('/user', async (req, res) => {

    const doc = new User(req.body)
    const obj = await doc.save()
    res.send(obj)
})

router.delete('/user/:id', async (req, res) => {

    await User.findOneAndRemove({_id: req.params.id})
    res.sendStatus(202)
})

router.get('/users', async (req, res) => {

    const docs = await User.find({})
    res.send(docs)
})

router.patch('/user/:id', async (req, res) => {

    const body = _.pick(req.body, ['displayName','mobilePhone','mail'])

    const newUser = await User.findOneAndUpdate({_id: req.params.id}, body, {new: true})

    res.send(newUser)
})

module.exports = router