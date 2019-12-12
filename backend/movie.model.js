const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movie = new Schema({
    _id: Number,
	title: String,
	overview: String,
	poster_path: String,
	genres: [{id: Number, name: String}],

});

module.exports = mongoose.model('Movie', Movie);
