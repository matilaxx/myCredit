const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");

const authorize = require("../helper/auth.helper");
const TransactionController = require("../controllers/transaction.controller");
// const transaction = require("../models/transaction");
// const { Router } = require("express");

router.post(
    "/:id",
    (req,res,next) => {
        const errors = [];
        if (!req.body.title) {
          errors.push("Title required");
        }
        if (!req.body.description) {
          errors.push("Description required");
        }
        if (!req.body.credit) {
            errors.push("Credit required");
          }
          if (!req.body.tipe) {
            errors.push("Tipe required");
          }

    
        if (errors.length > 0) {
          next({
            status: 400,
            message: errors,
          });
        }  next();
      
    },
    TransactionController.createTransaction
)

router.post(
    "/:id/uploadImage",[middleware.upload], TransactionController.uploadImage);

router.get(
  "/out/:id",authorize,TransactionController.getTransactionOut
)
router.get(
  "/in/:id",authorize,TransactionController.getTransactionIn
)

router.delete(
    "/:id",
    authorize,TransactionController.deleteTransaction
)

module.exports = router