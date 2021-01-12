// Models
const ServerMembers = require("../../models/ServerMembers");
const Channels = require("../../models/channels");
const User = require("../../models/users");
const Messages = require("../../models/messages");
const Notifications = require('../../models/notifications');
const redis = require("../../redis");

import deleteServer from "../../utils/deleteServer";
import { deleteFCMFromServer, sendServerPush } from "../../utils/sendPushNotification";
module.exports = async (req, res, next) => {
  // check if its the creator and send an error if it is.
  if (req.server.creator === req.user._id) {
    return res.status(403).json({message: "You may delete your server through the server settings page."});
  }

  const channels = await Channels.find({ server: req.server._id }).lean();
  const channelIDArray = channels.map(c => c.channelID)

  // Leave server
  await deleteFCMFromServer(req.server.server_id, req.user.uniqueID);

  // delete all leavers notification from the server 
  if (channelIDArray) {
    await Notifications.deleteMany({
      channelID: { $in: channelIDArray },
      recipient: req.user.uniqueID
    });
  }


  await redis.remServerMember(req.user.uniqueID, req.server.server_id);

  // remove server from users server list.
  await User.updateOne(
    { _id: req.user._id },
    { $pullAll: { servers: [req.server._id] } }
  );

  // delete member from server members
  await ServerMembers.deleteMany({
    member: req.user._id,
    server: req.server._id
  });
  
  res.json({ status: "Done!" });
  const io = req.io;


  // leave room
  const rooms = io.sockets.adapter.rooms[req.user.uniqueID];
  if (rooms)
    for (let clientId in rooms.sockets || []) {
      if (io.sockets.connected[clientId]) {
        io.sockets.connected[clientId].emit("server:leave", {
          server_id: req.server.server_id
        });
        io.sockets.connected[clientId].leave("server:" + req.server.server_id);
      }
    }

  // emit leave event 
  io.in("server:" + req.server.server_id).emit("server:member_remove", {
    uniqueID: req.user.uniqueID,
    server_id: req.server.server_id
  });

  // send leave message
  const messageCreate = new Messages({
    channelID: req.server.default_channel_id,
    creator: req.user._id,
    messageID: "placeholder",
    type: 2 // leave message
  });

  let messageCreated = await messageCreate.save();

  
  const user = {
    uniqueID: req.user.uniqueID,
    username: req.user.username,
    tag: req.user.tag,
    avatar: req.user.avatar,
    admin: req.user.admin
  };
  messageCreated = messageCreated.toObject();
  messageCreated.creator = user;

  // emit message
  const roomsMsg = io.sockets.adapter.rooms["server:" + req.server.server_id];
  if (roomsMsg)
    for (let clientId in roomsMsg.sockets || []) {
      io.to(clientId).emit("receiveMessage", {
        message: messageCreated
      });
    }


  const defaultChannel = await Channels.findOneAndUpdate({ channelID: req.server.default_channel_id }, { $set: {
    lastMessaged: Date.now()
  }}).lean();

  defaultChannel.server = req.server;
  sendServerPush({
    channel: defaultChannel,
    message: {
      channelID: defaultChannel.channelID,
      message: "left the server",
    },
    sender: user,
    server_id: req.server.server_id
  })

};
