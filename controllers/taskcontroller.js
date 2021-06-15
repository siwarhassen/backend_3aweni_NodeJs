const Task = require('../models/Task');
const { json } = require('body-parser');
const taskController = {};



/**add group*/
taskController.create = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    delete req.body._id;
    const task = new Task({
        ...req.body
      // Photo: url +`/uploads/${req.files['Photo'][0].filename}`
      });

      task.save()
    .then(() => res.status(201).json(task))  
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/**end add group */

/** get all courses*/
taskController.taskdone = async (req, res, next) => {
  Task.find({ Group: req.params.group_id ,  State: 'Done' })
.then(task => {res.status(200).json(task);console.log(task)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */

/** get all courses*/
taskController.taskname = async (req, res, next) => {
  Task.findOne({ _id: req.params.id })
.then(task => {res.status(200).json(task);console.log(task)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */

/** get all courses*/
taskController.taskdoing = async (req, res, next) => {
  Task.find({ Group: req.params.group_id ,  State: 'Doing' })
.then(task => {res.status(200).json(task);console.log(task)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */

/** get all courses*/
taskController.tasktodo = async (req, res, next) => {
  Task.find({ Group: req.params.group_id ,  State: 'ToDo' })
.then(task => {res.status(200).json(task);console.log(task)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */


taskController.updatetask = async (req, res, next) => {

  Task.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {new: true})
    .then((task) => res.status(200).json({task}))
    .catch(error => {res.status(400).json(error);console.log(error)});


};


taskController.deletetask= async (req, res, next) => {
  try {
    await Task.deleteOne({ _id: req.params.group_id });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
  };
/**end */




  module.exports = taskController;