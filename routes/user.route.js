const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authorize = require("../helper/auth.helper");
const UserController = require("../controllers/user.controller")


router.get(
    "/:id",authorize,
    UserController.getUser
);

router.put (
    "/:id",authorize,UserController.updateUser
);

router.delete(
    "/:id",authorize,UserController.deleteUser
)

module.exports = router;