import React, { useEffect, useState } from "react";
import Posneg from "./Posneg";

export default function Transcript({company}) {
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/connect/api/transcript/${company}`)
		.then(res => res.json())
		.then(data => {
				setData(data.data);
		})
	},[])
	return (
		<div className="transcript">
			<h2 className="heading">Transcript</h2>	
			{data.pos_state ? (
				<>
					<div>
						<h3 className="heading">Sentiment Analysis</h3>
						<ul>
							<li>
								No. of Positive statements: {data.pos_state.length}
							</li>
							<li>
								No. of Neutral statements: {data.neut_state.length}
							</li>
							<li>
								No. of Negative statements: {data.neg_state.length}
							</li>
							<br />
							<li>
								No. of Environment statements: {data.environment_stmts.length}
							</li>
							<li>
								No. of Social statements: {data.social_stmts.length}
							</li>
							<li>
								No. of Governance statements: {data.gov_stmts.length}
							</li>
							<br />
							<li>
								No. of Forward-looking statements: {data.fls_statements.length}
							</li>
							<li>
								No. of Non-forward-looking statements: {data.Notfls_statements.length}
							</li>

						</ul>
					</div>
					<Posneg data={data} />
				</>
			) : "Loading..."}
		</div>
	)
}
