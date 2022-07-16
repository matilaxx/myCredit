const { User } = require("../models");

class UserController{
    static async getUser(req,res,next) {
        try {
            const user = await User.findOne({
                where:{
                    id : req.params.id
                }
            });
            if (!user) {
                throw {
                  status: 404,
                  message: "User Not Found !",
                };
              } else {
                res.status(200).json({
                  status: 200,
                  message: `Successfully get user by id`,
                  user,
                });
              }

        } catch (err) {
            next(err);
        }
    }

    static async updateUser(req,res,next){
        try {

            const updatedUser = await User.update(
                {
                  nama: req.body.nama,
                  email: req.body.email,
                 
                },
                {
                  where: {
                    id: req.params.id,
                  },
                  returning: true,
                }
              );
              const data = updatedUser[1][0];
        
              res.status(200).json({
                statusCode: "200",
                status: "Updated",
                message: "Berhasil mengupdate user",
                data,
              });
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser (req,res,next){
        try {
            const user = await User.findOne({
                where: {
                  id: req.params.id,
                },
              });
        
              await User.destroy({
                where: {
                  id: req.params.id,
                },
              });
              res.status(200).json({
                statusCode: "200",
                status: "Delete",
                message: "Successfully delete user",
                user,
              });
        } catch (err) {
            next(err)
        }
        
    }

}
module.exports = UserController;