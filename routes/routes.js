const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  app.get('/api', DriversController.greeting);

  app.get('/api/items/all/', DriversController.getAllItems);
  app.post('/api/users', DriversController.create);
  app.post('/api/login', DriversController.logIn);
  app.post('/api/items/:id', DriversController.createItem);
  app.get('/api/items/:id', DriversController.getItems);
  app.put('/api/ads/:id', DriversController.editAds);
  app.get('/api/:id', DriversController.getUser);
};
