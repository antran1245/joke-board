const FavoritesController = require('../controllers/favorites.controllers');

module.exports = (app) => {
    app.post('/api/favorite', FavoritesController.Favorite);
}