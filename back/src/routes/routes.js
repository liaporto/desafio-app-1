const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.use("/private", passport.authenticate("jwt", { session: false }));

// Auth-Routes
router.get("/private/getDetails", AuthController.getDetails);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.put("/update/:id", AuthController.update);

// User-Routes
router.get("/users", UserController.index);
router.get("/users/:id", UserController.find);
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);

module.exports = router;
