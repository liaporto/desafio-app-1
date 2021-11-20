const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.use("/api/private", passport.authenticate("jwt", { session: false }));

// Auth-Routes
router.get("/api/private/getDetails", AuthController.getDetails);
router.post("/api/register", AuthController.register);
router.post("/api/login", AuthController.login);
router.get("/api/private/auth", AuthController.auth);
router.put("/api/private/update", AuthController.update);
router.delete("/api/private/remove", AuthController.remove);
router.get("/api/logout", AuthController.logout);

// User-Routes
router.get("/api/users", UserController.index);
router.get("/api/users/:id", UserController.find);
router.post("/api/users", UserController.create);
router.put("/api/users/:id", UserController.update);
router.delete("/api/users/:id", UserController.destroy);

module.exports = router;
