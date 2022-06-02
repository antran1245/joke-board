const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    joke: {
        type: Map,
        of: String,
        required: true
    },
    count: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

const Favorite = mongoose.model('favorites', FavoriteSchema)

module.exports = Favorite;