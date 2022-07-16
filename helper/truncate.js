const { User, Transaction } = require("../models");

module.exports = {
  user: () => User.destroy({ truncate: true, restartIdentity: true }),
  transaction: () => Transaction.destroy({ truncate: true, restartIdentity: true }),
};