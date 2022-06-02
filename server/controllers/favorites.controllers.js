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