import React, { Component } from 'react';
import axios from 'axios';

export default class FavMovies extends Component {

	constructor(props) {
		super(props);

		this.removeMovie = this.removeMovie.bind(this);
		this.addToFav = this.addToFav.bind(this);

		this.state = {favMovies: []};
	}

	componentDidMount() {
	axios.get('http://localhost:4000/movies/')
		.then(response => {
			this.setState({ favMovies: response.data });
		})
		.catch(function (error){
			console.log(error);
		})
	}

	getFavMovies(){
		if (this.state.favMovies.length === 0)
		{
			return <div className="noResult"><br/><p>No Movies Favorited Yet!</p></div>;
		}
		else
		{
			return this.state.favMovies.map(currentMovie => (
				<div className="movieContent mx-5" key={currentMovie._id}>
					{(currentMovie.poster_path!=null)?
						(<div className="poster">
							<img src={"https://image.tmdb.org/t/p/w185"+currentMovie.poster_path+""} alt={currentMovie.title}/>
						</div>):
						(<div className="poster"/>)
					}
					<div className="movieData">
						<span>
							<span style={{fontSize:'2em'}}>{currentMovie.title}  </span>
							<br/>
							<span style={{fontStyle: "italic", color: "grey", fontSize:"1.25em"}}>{currentMovie.genres.map(gObj =>{return gObj.name + " "})}</span>
							</span><br/>
							<p>{currentMovie.overview}</p>
							<br/>
							<button onClick={this.removeMovie} id={currentMovie._id} type="button" className="btn, btn-danger">Remove From Favorites</button>
					</div>
				</div>
			));
		}
	}

	async removeMovie(e) {
		e.preventDefault();
		await axios.delete('http://localhost:4000/movies/remove/'+e.target.id).catch(function(error) {
			console.log("DELETE error: "+error);
		});
		await axios.get('http://localhost:4000/movies/')
			.then(response => {
				this.setState({ favMovies: response.data });
			})
			.catch(function (error){
			console.log("GET error: "+error);
		});
	}
	addToFav(e) {
		alert(e.target.id)
	}

	render() {
		return (
			<div style={{marginTop: 10}}>
				<div className="searchbar mx-3">
					<h3>Favorites</h3>
				</div>
				<hr className="myHR"/>
				<br/>
				{this.getFavMovies()}
			</div>
		);
	}
}
