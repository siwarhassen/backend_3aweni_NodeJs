const Group = require('../models/Group');
const { json } = require('body-parser');
const groupController = {};



/**add group*/
groupController.create = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    delete req.body._id;
    const group = new Group({
        ...req.body
      // Photo: url +`/uploads/${req.files['Photo'][0].filename}`
      });

      group.save()
    .then(() => res.status(201).json(group))  
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/**end add group */

/** get all courses*/
groupController.get = async (req, res, next) => {
  Group.find()
.then(group => {res.status(200).json(group);console.log(group)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */

groupController.recently = async (req, res, next) => {
  Group.find().sort({ $natural: -1 }).limit(10)
.then(group => {res.status(200).json(group);console.log(group)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end */




/**delete group  */
groupController.deletegroup= async (req, res, next) => {
  try {
    await Group.deleteOne({ _id: req.params.group_id });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
  };
/**end */

groupController.updategroup = async (req, res, next) => {
  Group.findByIdAndUpdate({ _id: req.params.group_id }, { ...req.body, _id: req.params.group_id }, {new: true})
    .then((group) => res.status(200).json({group}))
    .catch(error => {res.status(400).json(error);console.log(error)});
};



/*find group*/ 
groupController.showonegroup= async(req, res, next) => {
 
  
    Group.findOne({ _id: req.params.group_id })
    .then(group => {res.status(200).json(group);console.log(group)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
    };

groupController.get = async (req, res, next) => {
  Group.find()
.then(group => {res.status(200).json(group);console.log(group)})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/*find group*/ 
groupController.displaygroup= async(req, res, next) => {

  
   Group.find( { Name: { $regex: req.params.name, $options: "$i" } } )
    .then(group => {res.status(200).json(group);console.log(group)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
  
  };

      
/**end group */

/*find group*/ 
groupController.mygroups= async(req, res, next) => {
 
   Group.find({ Owner: req.params.owner })
    .then(group => {res.status(200).json(group);console.log(group)})
    .catch(error => {res.status(400).json({ error });console.log(error)});

  };

      
/**end group */





  module.exports = groupController;