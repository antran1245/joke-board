const { model } = require('mongoose');
const Favorite = require('../models/favorites.models');

module.exports.Favorite = async(req, res) => {
    const { favoriteJoke, count } = req.body;
    let favorite = await Favorite.findOne({joke: favoriteJoke})
    if(favorite) {
        Favorite.findOneAndUpdate(
            {joke: favoriteJoke},
            {$inc: {count: count}},
            {new: true}
        )
        .then(resp => res.json(resp))
        .catch(err => res.json(err))
    } else {
        Favorite.create(
            {
                joke: favoriteJoke,
            }
        )
        .then(resp => res.json(resp))
        .catch(err => res.json(err))
    }
    
}

module.exports.getAll = (req, res) => {
    Favorite.find().sort({count: -1}).limit(5)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}