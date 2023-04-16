import React, { useEffect, useState } from "react"
import NewsCard from "../components/NewsCard";
import "../styles/News.css"

export default function News({company}) {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`https://eodhistoricaldata.com/api/news?api_token=demo&s=${company ? company : "AAPL"}&offset=0&limit=10`)
		.then(res => res.json())
		.then(data => {
				setData(data)
		})
		.catch(err => {
			console.log(err)
		})
	}, [company])

	return (
		<div className="news">
 			<h1>News</h1>
			{data.length === 0 ? (<h2>Loading...</h2>) : 
				<div className="card-wrapper">
					{data.map((el,i) => {
						return <NewsCard key={i} data={el} />
					})}
				</div>
			}
		</div>
	)
}
