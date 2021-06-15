const GroupMember = require('../models/GroupMember');
const { json } = require('body-parser');
const GroupMemberController = {};


/**add group*/
GroupMemberController.join = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    delete req.body._id;
    const groupmember = new GroupMember({
        ...req.body
   
      });

      groupmember.save()
    .then(() => res.status(201).json(groupmember))  
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/**end add group */




/*find group*/ 
GroupMemberController.members= async(req, res, next) => {
 
     GroupMember.find({ Group: req.params.groupid }).populate([{   path:'Member',
     model:'user'}]).sort( { Role: 1 } )
     .then(groupmember => {res.status(200).json(groupmember);console.log(groupmember)})
     .catch(error => {res.status(400).json({ error });console.log(error)});

  };

      
/**end group */

/*find group*/ 
GroupMemberController.member= async(req, res, next) => {
 
  GroupMember.findOne({ Member: req.params.id }).populate([{   path:'User',
  model:'user'}])
  .then(groupmember => {res.status(200).json(groupmember);console.log(groupmember)})
  .catch(error => {res.status(400).json({ error });console.log(error)});

};

   
/**end group */


/**delete group  */
GroupMemberController.leave= (req, res, next) => {
  GroupMember.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ groupmember: 'group member supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };
/**end */



GroupMemberController.updaterole = async (req, res, next) => {
  GroupMember.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {new: true})
  .then((group) => res.status(200).json({group}))
  .catch(error => {res.status(400).json(error);console.log(error)});
};




/*find group*/ 
GroupMemberController.groupsofmember= async(req, res, next) => {
 
  GroupMember.find({ Member: req.params.id }).populate([{   path:'User',
  model:'user'},
  {
    path:'Group',
  model:'groups'
  }
])
  .then(groupmember => {res.status(200).json(groupmember);console.log(groupmember)})
  .catch(error => {res.status(400).json({ error });console.log(error)});

};

   
/**end group */


  module.exports = GroupMemberController;