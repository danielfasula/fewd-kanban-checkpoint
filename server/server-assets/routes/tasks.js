let router = require('express').Router()
let Task = require('../models/Task')


router.get('/:boardId', (req, res, next) => {
  Task.find({ boardId: req.params.boardId })
    .then(tasks => {
    res.send(tasks)
    })
  .catch(next)
})

router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Task.create(req.body)
    .then(task => {
      res.send(task)
    })
    .catch(next)
})

//changing the lisId of a task
router.put('/:id', (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTask => {
      res.send(updatedTask)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({message: "Task Deleted"})
    })
    .catch(next)
})

//add a comment as a subdoc
router.put('/:id/add-comment', (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => {
      task.comments.push(req.body)
      task.save(err => {
        if (err) {
          return res.status(400).send({err})
        }
        res.send(task)
      })
    })
    .catch(next)
})

router.put('/:id/remove-comment', (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => {
      let cId = req.body._id
      task.comments.forEach((c, i, arr) => {
        if (c._id.toString() == cId) {
          arr.splice(i, 1)
        }
      })
      task.save(err => {
        if (err) {
          return next(err)
        }
        res.send(task)
      })
    })
    .catch(next)
})

module.exports = router