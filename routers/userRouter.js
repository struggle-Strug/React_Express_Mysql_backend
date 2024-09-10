const router = require("express").Router();
const passport = require("passport");
require("../config/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

// const { signup, signin} = require("../controller/UserCtr");

// router.post("/signup", signup);
// router.get("/signin", signin);


module.exports = router;
