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
    List.findByIdAndRemove(req.params.id)
        .then(list => {
            res.send({message: "List Deleted!"})
        })
        .catch(next)
})

module.exports = router