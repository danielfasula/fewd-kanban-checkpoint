let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Board'

let List = require('./List')
let Task = require('./Task')


let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE

schema.pre('findOneAndRemove', function (next) {
  //@ts-ignore
  let params = { boardId: this._conditions._id }
  Promise.all([
    List.deleteMany(params), Task.deleteMany(params)
  ])
    .then(() => {
      console.log('lists and tasks deleted!')
      next()
    })
    .catch(err => next(err))
})




module.exports = mongoose.model(schemaName, schema)