const router = require("express").Router();
const passport = require("passport");
require("../config/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const { signup, signin } = require("../controllers/userController");

router.post("/register", signup);
router.post("/login", signin);


module.exports = router;
