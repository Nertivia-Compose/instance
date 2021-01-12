const ServerInvites = require("../../../models/ServerInvites");
const publicServersList = require("../../../models/publicServersList");
const Servers = require("../../../models/servers");


import joinServer from '../../../utils/joinServer';

module.exports = async (req, res, next) => {
  const { invite_code, server_id } = req.params;
  const { socketID } = req.body;

  let invite, server;

  if (invite_code) {
    // Find invite
    invite = await ServerInvites.findOne({ invite_code })
      .populate({ path: "server", populate: [{ path: "creator" }] })
      .lean();
    // check if banned
    if (!invite) {
      return res.status(404).json({ message: "Invalid invite code." });
    }
    const checkBanned = await Servers.findOne({
      _id: invite.server._id,
      "user_bans.user": {
        $ne: req.user._id
      }
    });
    if (!checkBanned) invite = undefined;
  } else if (server_id) {
    server = await Servers.findOne({
      server_id: server_id,
      "user_bans.user": {
        $ne: req.user._id
      }
    })
      .populate("creator")
      .lean();
    // check if server is in public list
    if (server) {
      const checkPublicList = await publicServersList.findOne({
        server: server._id
      });
      if (!checkPublicList) {
        return res.status(403).json({ message: "Server is not public." });
      }
    }
  }

  if (!invite && !server)
    return res.status(404).json({ message: "Invalid server." });
  joinServer(server || invite, req.user, socketID, req, res)
};