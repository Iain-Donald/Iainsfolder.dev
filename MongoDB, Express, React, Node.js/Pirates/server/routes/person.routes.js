const PersonController = require('../controllers/person.controller');
const PersonModel = require('../models/person.model')
module.exports = function(app){
    app.get('/api', PersonModel.findAllUsers);
    app.get('/api/getByID/:id', PersonController.getByID);
    app.post('/api/people', PersonController.createPerson);
    app.post('/api/:id/edit', PersonController.editPerson);
    app.get('/api/:id/delete', PersonController.deletePerson);
}