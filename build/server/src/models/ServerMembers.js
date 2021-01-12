const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const {
    Schema
} = mongoose;




const serverMembersSchema = new Schema({

  member: { type: Schema.Types.ObjectId, ref: 'users'},
  server: {type: Schema.Types.ObjectId, ref: 'servers'},
  server_id: {type: String},
  type: {type: String, default: "MEMBER", enum: ['MEMBER','OWNER', 'ADMIN', 'BOT']},
  roles: [{type: String, required: false, select: false}],
  muted: {type: Number, select: false, enum: [0, 1, 2]}, // enable, sound, mute all
  muted_channels: [{type: String, required: false, select: false}],
  last_seen_channels: {type: Object, select: false}

});


serverMembersSchema.index({member: 1, server: 1}, {unique: true});


const serverMembers = mongoose.model('server_members', serverMembersSchema);



module.exports = serverMembers;