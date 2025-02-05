import "../styles.css";
import { useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
	id: number;
	title: string;
	image: string;
	genre: string;
	rating: number;
}

export default function MoviesGrid({movies}) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [genre, setGenre] = useState<string>("All Genres");
	const [rating, setRating] = useState<string>("All");

	const handleSearchChange = (
		e: React.SyntheticEvent<HTMLInputElement, Event>
	) => {
		const target = e.target as HTMLInputElement;
		setSearchTerm(target.value);
	};

	const handleGenreChange = (
		e: React.SyntheticEvent<HTMLSelectElement, Event>
	) => {
		const target = e.target as HTMLSelectElement;
		setGenre(target.value);
	};

	const handleRatingChange = (
		e: React.SyntheticEvent<HTMLSelectElement, Event>
	) => {
		const target = e.target as HTMLSelectElement;
		setRating(target.value);
	};

	const matchesGenre = (movie: Movie, genre: string) => {
		return (
			genre === "All Genres" ||
			movie.genre.toLowerCase() === genre.toLowerCase()
		);
	};

	const matchesRating = (movie: Movie, rating: string) => {
		switch (rating) {
			case "All":
				return true;
			case "Good":
				return movie.rating >= 8;
			case "Ok":
				return movie.rating >= 5 && movie.rating < 8;
			case "Bad":
				return movie.rating < 5;
			default:
				return false;
		}
	};

	const matchesSearchTerm = (movie: Movie, searchTerm: string) => {
		return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
	};

	const filteredMovies = movies.filter(
		(movie) =>
			matchesGenre(movie, genre) &&
			matchesRating(movie, rating) &&
			matchesSearchTerm(movie, searchTerm)
	);

	return (
		<>
			<input
				type="text"
				className="search-input"
				placeholder="Search movies..."
				value={searchTerm}
				onChange={handleSearchChange}
			/>

			<div className="filter-bar">
				<div className="filter-slot">
					<label>Genre</label>
					<select
						className="filter-dropdown"
						value={genre}
						onChange={handleGenreChange}
					>
						<option>All Genres</option>
						<option>Action</option>
						<option>Drama</option>
						<option>Fantasy</option>
						<option>Horror</option>
					</select>
				</div>

				<div className="filter-slot">
					<label>Rating</label>
					<select
						className="filter-dropdown"
						value={rating}
						onChange={handleRatingChange}
					>
						<option>All</option>
						<option>Good</option>
						<option>Ok</option>
						<option>Bad</option>
					</select>
				</div>
			</div>

			<div className="movies-grid">
				{filteredMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie}></MovieCard>
				))}
			</div>
		</>
	);
}
