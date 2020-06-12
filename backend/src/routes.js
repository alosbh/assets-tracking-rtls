const express= require('express');

const BeaconController = require('./controllers/BeaconController')
const GatewayController = require('./controllers/GatewayController')
const CategoryController = require('./controllers/CategoryController')
const SubCategoryController = require('./controllers/SubCategoryController')
const AreaController = require('./controllers/AreaController')
const SubAreaController = require('./controllers/SubAreaController')
const ToolingController = require('./controllers/ToolingController')
const RSSIController = require('./controllers/RSSIController')
const routes = express.Router();

routes.post('/rssi',RSSIController.save);
routes.get('/rssi', RSSIController.index);

routes.get('/beacons', BeaconController.index);
routes.post('/beacons', BeaconController.create);
routes.delete('/beacons/clear', BeaconController.clear);
routes.delete('/beacons/delete/:id', BeaconController.delete);
routes.put('/beacons/:id', BeaconController.update);

routes.get('/gateway', GatewayController.index);
routes.post('/gateway', GatewayController.create);
routes.delete('/gateway/clear', GatewayController.clear);
routes.delete('/gateway/delete/:id', GatewayController.delete);
routes.put('/gateway/:id', GatewayController.update);

routes.post('/category', CategoryController.create);
routes.get('/category', CategoryController.index);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/delete/:id', CategoryController.delete);
routes.delete('/category/clear', CategoryController.clear);

routes.post('/subcategory', SubCategoryController.create);
routes.get('/subcategory', SubCategoryController.index);
routes.put('/subcategory/:id', SubCategoryController.update);
routes.delete('/subcategory/delete/:id', SubCategoryController.delete);
routes.delete('/subcategory/clear', SubCategoryController.clear);

routes.post('/Area', AreaController.create);
routes.get('/Area', AreaController.index);
routes.put('/Area/:id', AreaController.update);
routes.delete('/Area/delete/:id', AreaController.delete);
routes.delete('/Area/clear', AreaController.clear);

routes.post('/subArea', SubAreaController.create);
routes.get('/subArea', SubAreaController.index);
routes.put('/subArea/:id', SubAreaController.update);
routes.delete('/subArea/delete/:id', SubAreaController.delete);
routes.delete('/subArea/clear', SubAreaController.clear);

routes.post('/tooling', ToolingController.create);
routes.get('/tooling', ToolingController.index);
routes.put('/tooling/:id', ToolingController.update);
routes.delete('/tooling/delete/:id', ToolingController.delete);
routes.delete('/tooling/clear', ToolingController.clear);

routes.get("/images/subarea/:id", function (req, res) {
    console.log(req.params.id);
    res.sendFile(__dirname + "/assets/subareas/"+req.params.id+".jpg");
});



routes.get("/images/rpi", function (req, res) {
    console.log(req.params.id);
    res.sendFile(__dirname + "/assets/rpi.png");
});


module.exports = routes;