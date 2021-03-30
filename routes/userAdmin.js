const express = require("express");
const router = express.Router();
const userAdminController = require("../controllers/userAdminController");

router.get("/", userAdminController.dashboard);

module.exports = router;
