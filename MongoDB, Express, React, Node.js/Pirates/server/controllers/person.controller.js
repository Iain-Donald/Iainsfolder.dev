const { Person } = require('../models/person.model');
const mongoose = require('mongoose');


module.exports.getByID = (request, response) => {
    Person.findOne({ _id: request.params.id })
        .then(oneSingleUser => response.json({ user: oneSingleUser }))
        .catch(err => response.json({ message: 'Something went wrong', error: err }));
}

module.exports.createPerson = (request, response) => {
    const {pirateName, imageURL, chests, piratePhrase, crewPosition, pegLeg, eyePatch, hookHand } = request.body;
    Person.create({
        pirateName, 
        imageURL,
        chests,
        piratePhrase,
        crewPosition,
        pegLeg,
        eyePatch,
        hookHand
    })
        .then(person=>response.json(person))
        .catch(err=>response.status(400).json(err));
}


// Product manager 3 //

module.exports.editPerson = (request, response) => {
    const {title, price, description } = request.body;
    Person.findByIdAndUpdate( request.params.id, { 
        title: title,
        price: price,
        description: description
    })
        .then(person=>response.json(person))
        .catch(err=>response.json(err));
};

module.exports.deletePerson = (request, response) => {
    Person.findOneAndDelete( request.params.id )
        .then(console.log(request.params.id + " delete request sent"))
        .catch(err => response.json({ message: 'Something went wrong', error: err }));
};