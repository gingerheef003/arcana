import React from "react";
import '../styles/NewsCard.css'

export default function NewsCard(props) {
	return (
		<div className="card-container">
			<h3>{props.data.title}</h3>
			<p>{props.data.content}</p>
		</div>
	)
}
