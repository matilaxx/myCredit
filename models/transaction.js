'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Transaction.belongsTo(models.User,{foreignKey:"userId",as:"transaction"})
    }
  }
  Transaction.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    credit: DataTypes.FLOAT,
    image_url: DataTypes.STRING,
    tipe: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};