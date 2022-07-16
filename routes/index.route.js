const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const transactionRoutes = require ("./transaction.route");


router.get("/", (req, res, next) => {
  res.redirect("/api-docs");
});

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/transaction", transactionRoutes);


module.exports = router;
