import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import MovieSearch from './components/movie-search.component';
import FavMovies from './components/fav-movies.component';

import logo from './logo.png'

class App extends Component {
	render() {
		return (
			<Router>
    			<div className="container-fluid">
    				<nav className="navbar navbar-expand-lg navbar-light rounded-bottom">
						<img src={logo} width="30" height="30" alt="My Website" />
						<Link to="/" className="navbar-brand">MERN-Stack Movie Search App</Link>
						<div className="collpase navbar-collapse">
							<ul className="navbar-nav mr-auto">
								<li className="navbar-item">
									<Link to='/' className="nav-link">Movie Search</Link>
								</li>
								<li className="navbar-item">
									<Link to='/favs' className="nav-link">Favorite Movies</Link>
								</li>
							</ul>
						</div>
					</nav>
					<div className="body-content">
						<Route path="/" exact component={MovieSearch} />
						<Route path="/favs" component={FavMovies} />
					</div>
    			</div>
    		</Router>
		);
	}
}

export default App;
