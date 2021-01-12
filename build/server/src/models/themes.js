const {
  Schema,
  model,
} = require("mongoose");


const themesSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  css: {type: String, required: true},
  creator: { type: Schema.Types.ObjectId, ref: 'users' },
})



module.exports = model('themes', themesSchema);