let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'

let Task = require('./Task')


let schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
schema.pre('remove', function (next) {
  Task.deleteMany({ listId: this._id }, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Tasks deleted')
    next()
  })
})



module.exports = mongoose.model(schemaName, schema)
