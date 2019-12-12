const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = express.Router();

const PORT = 4000;

let Movie = require('./movie.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/movies', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

movieRoutes.route("/").get(function(req, res){
	Movie.find(function(err, movies){
		if (err) {
			console.log(err);
		}
		else {
			res.json(movies);
		}
	});
});

movieRoutes.route("/:id").get(function(req, res){
	let id = req.params.id;
	Movie.findById(id, function(err, movie){
		res.json(movie);
	});
});

movieRoutes.route("/add").post(function(req, res){
	let movie = new Movie(req.body);
	movie.save().then(movie => {
		res.status(200).json({'movie': 'movie added successfully'});
	})
	.catch(err => {
		res.status(400).send('adding movie failed');
	});
});

movieRoutes.route("/remove/:id").delete(function(req, res) {
	Movie.remove({
		_id: req.params.id
	}, function(err, movie){
		if (err) {
			console.log(err);
		}
		else {
			res.json({"movie" : 'movie removed successfully'});
		}
	});
});

app.use('/movies', movieRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
