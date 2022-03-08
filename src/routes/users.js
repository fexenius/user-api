const express = require("express");
const router = express.Router();
const routeCache = require("route-cache");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/user");

router.get("/", routeCache.cacheSeconds(20), function (req, res) {
  getUsers(req, res);
});

router.get("/:id", function (req, res) {
  getUserById(req, res);
});

router.post("/", function (req, res) {
  createUser(req, res);
});

router.patch("/:id", async function (req, res) {
  updateUser(req, res);
});

router.delete("/:id", function (req, res) {
  deleteUser(req, res);
});

module.exports = router;
