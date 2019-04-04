let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let comment = new Schema({
  content: { type: String, required: true }
}, { timestamps: true })

let schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  comments: [comment]
}, { timestamps: true })

//CASCADE ON DELETE




module.exports = mongoose.model(schemaName, schema)