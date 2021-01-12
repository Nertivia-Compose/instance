const MainThemesRouter = require("express").Router();

// Middleware
const GDriveOauthClient = require("./../../../middlewares/GDriveOauthClient");
const authenticate = require("../../../middlewares/authenticate");
const policies = require('../../../policies/publicThemePolicies');
const rateLimit = require('../../../middlewares/rateLimit');


// add theme
MainThemesRouter.route('/:id').post(
  authenticate(),
  policies.submit,
  GDriveOauthClient,
  require("./addThemePublic")
);

// update theme
MainThemesRouter.route('/:id').patch(
  authenticate(),
  policies.update,
  GDriveOauthClient,
  require("./saveThemePublic")
);


// apply a theme
MainThemesRouter.route('/:id/apply').get(
  authenticate(),
  rateLimit({name: 'public_theme_apply', expire: 60, requestsLimit: 120 }),
  require("./applyThemePublic")
);


// get a theme
MainThemesRouter.route('/:id').get(
  authenticate(),
  require("./getThemePublic")
);

// get all themes
MainThemesRouter.route('/').get(
  authenticate(),
  require("./getAllThemes")
);





module.exports = MainThemesRouter;
