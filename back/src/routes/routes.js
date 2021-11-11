const { Router } = require("express");
const UserController = require("../controllers/UserController");
const router = Router();

router.get("/users", UserController.index);
router.get("/users/:id", UserController.find);
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);

module.exports = router;
