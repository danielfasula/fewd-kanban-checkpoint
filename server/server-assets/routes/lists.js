let router = require('express').Router()
let List = require('../models/List')

router.get('/:boardId', (req, res, next) => {
    List.find({boardId: req.params.boardId})
        .then(lists => {
            res.send(lists)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    List.create(req.body)
        .then(list => {
            res.status(200).send(list)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    List.remove({ _id: req.params.id }, err => {
        if (err) {
            return res.send(err)
        }
            res.send({message: "List Deleted!"})
        })
        .catch(next)
})

module.exports = router