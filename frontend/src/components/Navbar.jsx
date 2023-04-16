import React from "react"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"


export default function Navbar() {
	return (
		<div className="navbar">
			<div className="logo">Arcana Hackathon</div>
			<div className="navigation">
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'/news'}>News</Link>
				</li>
				<li>
					<Link to={'/analysis'}>Analysis</Link>
				</li>
				<li>
					<Link to={'/portfolio'}>Porfolio</Link>
				</li>
			</div>
		</div>
	)
}
