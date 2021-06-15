const Historique = require('../models/Historique');
const historiqueController = {};


/* add historique */
historiqueController.create = async (req, res, next) => {
  
 
      delete req.body._id;
      const historique = new Historique(
        {
        ...req.body
      }
      );

      historique.save()
      .then(() => { res.status(201).json(historique);
        console.log(req.body);
     
    
      })
      .catch(error => {res.status(400).json({ error });console.log( error)});

	
};
/**end */

/** get historique */
historiqueController.get = async (req, res, next) => {
    Historique.find({ Group: req.params.groupid }).populate([{   path:'User',
    model:'user'}])
    .then(historique => {res.status(200).json(historique);console.log(historique)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/** end */
module.exports = historiqueController;