const mongoose = require("mongoose");
const flake = require('../utils/genFlakeId').default;

const {
  Schema
} = mongoose;


const embedSchema = new Schema({
  title: {type: String},
  type: {type: String},
  url: {type: String},
  image: {type: Object},
  site_name: {type: String},
  description: {type: String},
})


const messagesSchema = new Schema({
  channelID: { type: String, required: true },
  messageID: { type: String, required: true, unique: true },
  files: { type: Array, required: false },
  message: { type: String, required: false  },
  creator: { type: Schema.Types.ObjectId, ref: 'users' },
  created: { type: Number },
  embed: {type: embedSchema},
  buttons: {type: Array},
  htmlEmbed: {type: String},
  mentions: [{ type : Schema.Types.ObjectId, ref: 'users' }],
  quotes: [{ type : Schema.Types.ObjectId, ref: 'message_quotes' }],
  timeEdited: { type: Number, required: false},
  color: {type: String, required: false},
  type: {type: Number, default: 0, enum: [
    0, // Message
    1, // Join message
    2, // leave message,
    3, // kick message,
    4, // ban message
  ]}
})

messagesSchema.pre('save', function() {
  this.messageID = flake.gen();
  this.created = Date.now();
})



module.exports = mongoose.model('messages', messagesSchema);