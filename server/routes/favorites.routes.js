const FavoritesController = require('../controllers/favorites.controllers');

module.exports = (app) => {
    app.get('/api/favorite', FavoritesController.getAll);
    app.post('/api/favorite', FavoritesController.Favorite);
}