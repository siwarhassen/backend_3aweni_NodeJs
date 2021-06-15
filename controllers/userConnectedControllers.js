
const UserConnectedController = {};
const UserConnected = require('../models/usersConnected');

UserConnectedController.create = async (req, res, next) => {
  
    if (!req.body) {
        res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      }
      delete req.body._id;
      const userc = new UserConnected(
        {
        ...req.body,
        UserId:req.user.payload._id
 
      }
      );

      userc.save()
      .then(() => { res.status(201).json(userc);
        console.log(req.body);
     
    
      })
      .catch(error => {res.status(400).json({ error });console.log( error)});

	
};

UserConnectedController.delete = async (req, res, next) => {
    try {
      await UserConnected.deleteOne({ UserId: req.params.userid });
      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  };
  

UserConnectedController.get = async (req, res, next) => {
  try {
    const result = await UserConnected.find().populate({
        path:'UserId',
        model:'user'
      });
    return res.send({ result });
  } catch (error) {
    next(error);
  }
};



UserConnectedController.getByUserId = async (req, res, next) => {

  try {
    const result = await UserConnected.findOne({ UserId: id }).populate({
        path:'UserId',
        model:'user'
      });
    return res.send({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = UserConnectedController;


