import "../styles.css";

export default function Footer() {
	const currentYear: number = new Date().getFullYear();

	return (
		<footer className="footer">
			<p className="footer-text">
				© {currentYear} Movie, All rights reserved by Mubi
			</p>
		</footer>
	);
}
