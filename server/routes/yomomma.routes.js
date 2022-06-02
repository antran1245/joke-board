const YoMommaController = require('../controllers/yomomma.controllers');

module.exports = (app) => {
    app.get('/api/yomomma', YoMommaController.YoMommaCall);
    app.get('/api/yomomma/:query',  YoMommaController.YoMommaCallQuery);
}