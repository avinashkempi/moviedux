import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import "./styles.css";
import { useEffect, useState } from "react";

interface Movie {
	id: number;
	title: string;
	image: string;
	genre: string;
	rating: number;
}

function App() {
	const [movies, setMovies] = useState<Movie[]>([]);
	useEffect(() => {
		fetch("movies.json")
			.then((response) => response.json())
			.then((data) => {
				setMovies(data);
			});
	}, []);
	return (
		<>
			<div className="App">
				<div className="container">
					<Header></Header>

					<Router>
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/watchlist">Watchlist</Link>
								</li>
							</ul>
						</nav>
						<Routes>
							<Route
								path="/"
								element={<MoviesGrid movies={movies} />}
							></Route>
							<Route
								path="/watchlist"
								element={<Watchlist />}
							></Route>
						</Routes>
					</Router>
				</div>
				<Footer></Footer>
			</div>
		</>
	);
}

export default App;
