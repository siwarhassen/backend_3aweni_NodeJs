const Favori = require('../models/favoris');

exports.addfavoris=(req, res, next) => {
  delete req.body._id;
  const favoris = new Favori({
    ...req.body,
        user:req.user.payload._id
  });
  favoris.save()
    .then(() => res.status(201).json(favoris))
    .catch(error => res.status(400).json({ message: 'Objet noooon !' }));
};


exports.fav= (req, res, next) => {
  console.log(req.user.payload._id)
  Favori.find({ user:req.user.payload._id }).populate({
    path:'course',
    model:'courses'
})
    .then(favoris => res.status(200).json(favoris))
    .catch(error => res.status(404).json({ error }));
};

exports.onefavoris= (req, res, next) => {
  Favori.findOne({ user:req.params.iduser ,course:req.params.idcourse })
    .then(favoris => res.status(200).json(favoris))
    .catch(error => res.status(404).json({ error }));
};

exports.deletefavoris= (req, res, next) => {

  Favori.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};