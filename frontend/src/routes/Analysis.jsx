import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
import NewsCard from "../components/NewsCard";
import News from "./News"
import "../styles/Analysis.css"
import Transcript from "../components/Transcript";

export default function Analysis() {

	const options = [
		{
			label: "Apple Inc.",
			value: "AAPL",
		},
		{
			label: "Alphabet Inc.",
			value: "GOOG",
		},
		{
			label: "Johnson & Johnson",
			value: "JNJ",
		},
		{
			label: "The Coca-Cola Company",
			value: "KO",
		},
		{
			label: "Microsoft Corporation",
			value: "MSFT",
		},
		{
			label: "NVIDIA Corporation",
			value: "NVDA",
		},
		{
			label: "The Procter & Gamble Company",
			value: "PG",
		},
		{
			label: "Tesla Inc",
			value: "TSLA",
		},
]

	const [company, setCompany] = useState(options[0].value)

	const [data, setData] = useState([]);

	useEffect(() => {
		setData([])
		fetch(`https://eodhistoricaldata.com/api/news?api_token=demo&s=${company ? company : "AAPL"}&offset=0&limit=3`)
		.then(res => res.json())
		.then(data => {
				setData(data)
		})
		.catch(err => {
			console.log(err)
		})
	}, [company])

	return (
		<div className="analysis">
			<h1>Analysis</h1>
			<div className="graph-incept">
				<div className="analysis graph-container">
					<select className="company-select" value={company} onChange={e => setCompany(e.target.value)}>
						{options.map((option) => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</select>
					<Graph company={company}/>
					<Transcript company={company} />
				</div>
				<div>
					<h2>News</h2>
					{data.length === 0 ? (<h2>None found</h2>) : 
						<div className="card-wrapper">
							{data.map((el,i) => {
								return <NewsCard key={i} data={el} />
							})}
						</div>
					}

				</div>
			</div>
											{/*<News company={company}/>*/}
					</div>
	)
}
