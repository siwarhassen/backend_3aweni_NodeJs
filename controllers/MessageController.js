const Message = require('../models/Message');
const { json } = require('body-parser');
const messageController = {};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}


/**add group*/
messageController.create = async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  delete req.body._id;
  const message = new Message({
      ...req.body
    });


    message.save()
  .then(() => res.status(201).json(message))
  .catch(error => {res.status(400).json({ error });console.log(error)});
};
/**end add group */




/** get all messages*/
messageController.get = async (req, res, next) => {
    Message.find({ $or: [ {$and: [{ sender: req.params.idsender }, {receiver:req.params.idreceiver}]} , {$and: [{ sender: req.params.idreceiver }, {receiver:req.params.idsender}]}]})
    .populate([{   path:'receiver',
  model:'user'} , {   path:'sender',
  model:'user'}])
    .then(message => {res.status(200).json(message);console.log(message)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */

/** get all messages*/
messageController.getlastmessage = async (req, res, next) => {
  Message.find({ $or: [ {$and: [{ sender: req.params.idsender }, {receiver:req.params.idreceiver}]} , {$and: [{ sender: req.params.idreceiver }, {receiver:req.params.idsender}]}]}).sort({ $natural: -1 }).limit(1).populate([{   path:'receiver',
  model:'user'} , {   path:'sender',
  model:'user'}])
  .then(message => {res.status(200).json(message);console.log(message)})
  .catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */





/** get all messages*/
messageController.getallmessages = async (req, res, next) => {
 
    Message.find({ $or: [{ sender: req.params.userid }, {receiver:req.params.userid}]}).populate([{   path:'receiver',
    model:'user'} , {   path:'sender',
    model:'user'}])
    .then(message => {res.status(200).json(message);console.log(message)})
    .catch(error => {res.status(400).json({ error });console.log(error)});

};
/** end */



messageController.deleteforsender = async (req, res, next) => {
 
  try {
    const check = await Message.findOne({ _id: req.params.idmessage });
    const message = await Message.updateOne({ _id: req.params.idmessage }, { hideforsender:1  });
    return res.send({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};



messageController.deleteforreceiver = async (req, res, next) => {

  try {
    const check = await Message.findOne({ _id: req.params.idmessage });
    const message = await Message.updateOne({ _id: req.params.idmessage }, {  hideforreceiver:1  });
    return res.send({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};


messageController.deleteforboth = async (req, res, next) => {

  try {
    const check = await Message.findOne({ _id: req.params.idmessage });
    const message = await Message.updateOne({ _id: req.params.idmessage }, {  hideforboth:1  });
    return res.send({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};







  module.exports = messageController;