const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    pirateName: {
        type: String,
        required: [true, "Pirate name is required"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    imageURL: {
        type: String,
        required: [true, "Image URL is required"]
    },
    chests: {
        type: String,
        required: [true, "Number of chests is required"]
    },
    piratePhrase: {
        type: String,
        required: [true, "Number of chests is required"]
    },
    crewPosition: {
        type: String,
        required: [true, "Pirate phrase is required"]
    },
    pegLeg: {
        type: Boolean
    },
    eyePatch: {
        type: Boolean
    },
    hookHand: {
        type: Boolean
    }
}, {timestamps: true});

module.exports.Person = mongoose.model("Person", PersonSchema);

module.exports.findAllUsers = (request, response) => {
    this.Person.find()
        .then(all => response.json({ message: all }))
        .catch(err => response.json({ message: 'Something went wrong', error: err }));
}