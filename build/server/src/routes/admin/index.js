const MainAdminRouter = require("express").Router();

// Middleware
const authenticate = require("../../middlewares/authenticate");
const isAdmin = require('../../middlewares/isAdmin');

// recently Created Accounts
MainAdminRouter.route("/users/recent").get(
  authenticate(),
  isAdmin,
  require("./recentUsers")
);

MainAdminRouter.route("/users/search/:value").get(
  authenticate(),
  isAdmin,
  require("./searchUsers")
);

MainAdminRouter.route("/users/:unique_id").delete(
  authenticate(),
  isAdmin,
  require("./suspendUser")
);
MainAdminRouter.route("/servers/:server_id").delete(
  authenticate(),
  isAdmin,
  require("./deleteServer")
);

// Online Users
MainAdminRouter.route("/users/online").get(
  authenticate(),
  isAdmin,
  require("./onlineUsers")
);


// recently Created Servers
MainAdminRouter.route("/servers/recent").get(
  authenticate(),
  isAdmin,
  require("./recentServers")
);

MainAdminRouter.route("/servers/search/:value").get(
  authenticate(),
  isAdmin,
  require("./searchServers")
);


// waiting for appeal themes
MainAdminRouter.route("/themes/waiting").get(
  authenticate(),
  isAdmin,
  require("./waitingThemes")
);

// get full theme information
MainAdminRouter.route("/themes/:id").get(
  authenticate(),
  isAdmin,
  require("./getTheme")
);


// Approve theme
MainAdminRouter.route("/themes/:id/approve").patch(
  authenticate(),
  isAdmin,
  require("./approveTheme")
);







module.exports = MainAdminRouter;
