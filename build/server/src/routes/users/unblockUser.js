const User = require('../../models/users');
const Friend = require('../../models/friends');
const BlockedUsers = require('../../models/blockedUsers');
const Channels = require('../../models/channels');
const redis = require('../../redis');

module.exports = async (req, res, next) => {
  const recipientUniqueID = req.body.uniqueID; 

  // check if the recipient exists
  const recipient = await User.findOne({uniqueID: recipientUniqueID});
  if (!recipient) return res.status(403)
    .json({ status: false, errors: [{param: "all", msg: "User not found."}] });

  // check if the blocker exists
  const requester = await User.findOne({uniqueID: req.user.uniqueID})
  if (!requester) return res.status(403)
    .json({ status: false, errors: [{param: "all", msg: "Something went wrong."}] });

  
  // check if is bit blocked
  const isBlocked = await BlockedUsers.exists({
    requester: requester,
    recipient: recipient
  })

  if (!isBlocked) {
    return res.status(403)
      .json({ message:"User is not blocked." });
  }

  await BlockedUsers.deleteOne({
    requester: requester,
    recipient: recipient
  })

  // check if channel is opened
  const openedChannel = await Channels.findOne({$or: [
    {creator: requester._id, recipients: recipient._id},
    {creator: recipient._id, recipients: requester._id}
  ]}).select("channelID")

  if (openedChannel) {
    await redis.deleteDmChannel(requester.uniqueID, openedChannel.channelID)
    await redis.deleteDmChannel(recipient.uniqueID, openedChannel.channelID)
  }

  const io = req.io
  
  io.in(requester.uniqueID).emit('user:unblock', recipient.uniqueID);

  return res.json({message: "User unblocked." })
}