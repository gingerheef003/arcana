import React, { useEffect, useState } from "react";

export default function Posneg({data}) {
	return (
		<div className="posneg-container">
			<h3 className="heading">Positive Statements</h3>	
			<div className="posneg">
				{data.pos_state.map((el) => {
					return <p>{el[0]}</p>
				})}
			</div>
			<h3 className="heading">Negative Statements</h3>	
			<div className="posneg">
				{data.neg_state.map((el) => {
					return <p>{el[0]}</p>
				})}
			</div>
			<h3 className="heading">Neutral Statements</h3>	
			<div className="posneg">
				{data.neut_state.map((el) => {
					return <p>{el[0]}</p>
				})}
			</div>

		</div>
	)
}
