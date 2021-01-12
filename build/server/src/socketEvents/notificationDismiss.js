const channels = require("../models/channels");
const ServerMembers = require("../models/ServerMembers");
const Notifications = require('./../models/notifications');
const redis = require('./../redis');
module.exports = async (data, client, io) => {
    const {channelID} = data;
    if (!channelID) return; 
    
    const { ok, result, error } = await redis.getConnectedBySocketID(client.id);
    if (!ok || !result) return;
    
    const uniqueID = result.u_id
    // server channel
    const serverChannel = await channels.findOne({channelID, server: {$exists: true, $ne: null}}).select("server");
    if (serverChannel) {
       await ServerMembers.updateOne({server: serverChannel.server, member: result._id}, {
            $set: {
                [`last_seen_channels.${channelID}`] : Date.now()
            }
        })

    }
    await Notifications.deleteOne({recipient: uniqueID, channelID});
    
    io.to(uniqueID).emit('notification:dismiss', {channelID, serverNotification: !!serverChannel});
}