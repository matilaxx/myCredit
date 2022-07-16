const { Transaction, User} = require("../models");
// const transaction = require("../models/transaction");
const { imagekit } = require("../helper/imagekit");
const jwt = require("jsonwebtoken");


class TransactionController {
    static async createTransaction(req,res,next){
        try {
            
            const transaction = await Transaction.create({
                title : req.body.title,
                description : req.body.description,
                credit : req.body.credit,
                tipe : req.body.tipe,
                userId : req.params.id,

            });
            const payload = {
              title: transaction.title,
              description: transaction.description,
              credit: transaction.credit,
              tipe: transaction.tipe,
              userId: transaction.userId,
            }
           return res.status(201).send({
                status: 201,
                message: "Successfully create transaction",
               data:payload
           })

        } catch (err) {
            next(err)
        }
    }

    static async uploadImage(req,res,next){
        try {
            const file = req.file.buffer.toString("base64");
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const fileName = uniqueSuffix + req.file.originalname;

            const {id} = req.params
            const upload = await imagekit.upload({
              fileName: fileName,
              file: file,
            });
      
            if(upload) {
              const url = upload.url;
              const token = req.headers.authorization
              const transaction = jwt.decode(token.split(' ')[1])
              let dataTransaction = await Transaction.findOne({
                where: { id: id },
              });
      
              let updated = await dataTransaction.update({
                image_url: url,
              });
              
              
              return res.status(200).json({
                status: 200,
                message: "File uploaded successfully",
                data: {
                    ...upload,
                },
              });
            }
            
        } catch (err) {
            next(err);
        }
    }

    static async getTransactionOut(req,res,next){
        try {
            const user = await Transaction.findOne({
                where:{
                    userId : req.user.id
                }
            });
            if (!user) {
                throw {
                  status: 404,
                  message: "You dont have access for this transaction",
                };   
        }
        const transaction = await Transaction.findAll({
            where:{
                tipe:"Pengeluaran",
            }
        })
        if (!transaction){
          throw {
            status: 404,
            message: "Your notes are empty"
          }
        }else {
          res.status(200).json({
            status: 200,
            message: `Successfully get transaksi pengeluaran`,
            transaction,
          });
        }

        
        } catch (err) {
            
        }
    
}
static async getTransactionIn(req,res,next){
  try {
      const user = await Transaction.findOne({
          where:{
              userId : req.user.id
          }
      });
      if (!user) {
          throw {
            status: 404,
            message: "You dont have access for this transaction",
          };   
  }
  const transaction = await Transaction.findAll({
      where:{
          tipe:"Pemasukan",
      }
  })
  if (!transaction){
    throw {
      status: 404,
      message: "Your notes are empty"
    }
  }else {
    res.status(200).json({
      status: 200,
      message: `Successfully get transaksi pemasukan`,
      transaction,
    });
  }

  
  } catch (err) {
      
  }

}

    static async deleteTransaction(req,res,next){
        try {
            const transaction = await Transaction.findOne({
                where: {
                    id: req.params.id,
                },
              });
        
              await Transaction.destroy({
                where: {
                  id: req.params.id,
                },
              });
              res.status(200).json({
            
                status: 200,
                message: "Successfully delete transaction",
                transaction,
              });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TransactionController;