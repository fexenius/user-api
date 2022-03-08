const express = require("express");
const router = express.Router();
const routeCache = require("route-cache");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("/", routeCache.cacheSeconds(20), getUsers);
router.get("/:id", getUserById);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
