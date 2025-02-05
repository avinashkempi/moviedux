import "../styles.css";

interface Movie {
	id: number;
	title: string;
	image: string;
	genre: string;
	rating: number;
}

export default function MovieCard({ movie }: { movie: Movie }) {
	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.src = "images/default.jpg";
	};

	const getRatingClass = (rating: number) => {
		if (rating >= 8) return "rating-good";
		if (rating >= 5 && rating < 8) return "rating-ok";
	};

	return (
		<div className="movie-card">
			<img
				src={`images/${movie.image}`}
				alt={movie.title}
				onError={handleError}
			/>
			<div className="movie-card-info">
				<h3 className="movie-card-title">{movie.title}</h3>
				<p className="movie-card-genre">{movie.genre}</p>
				<p className={`"movie-card-rating" ${getRatingClass(movie.rating)}`}>{movie.rating}</p>
			</div>
		</div>
	);
}
