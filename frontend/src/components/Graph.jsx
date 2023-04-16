import EChartsReact from "echarts-for-react";
import React, { useEffect, useState } from "react";
import * as echarts from "echarts"

export default function Graph({company}) {

	const [data, setData] = useState([]);
	const [value, setValue] = useState(false);
	const [mvavg, setMvavg] = useState([])

	const handleChange = () => {
		setValue(!value);
	}

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/connect/api/price/${company}`)
		.then(res => res.json())
		.then(data => {
				setData(data);
		})
		.catch(err => {
				console.error("Error in fetching:", err)
		});
	}, [company])

	useEffect(() => {
		if (value) {
			setMvavg([
				{
					data: data.map(item => item.ma50),
					type: 'line',
				},
				{
					data: data.map(item => item.ma200),
					type: 'line',
				}
			])
		} else {
			setMvavg([{}])
		}
	}, [value])

	
	const option = {
		tooltip: {
			trigger: 'axis',
			formatter: function(param) {
				return `<div style="padding: 2px 5px; text-align: left"><b>Date: ${param[0].name}</b><br />Close: ${param[0].value}`
			}
		},
		toolbox: {
			feature: {
				dataZoom: {
					yAxisIndex: 'none',
				},
				restore: {},
			}
		},
		dataZoom: [
			{
				type: 'inside',
				start: 50,
				end: 100,
			},
			{
				start: 0,
				end: 10,
			}
		],
		xAxis: {
			type: 'category',
			data: data.map(item => item.date)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map(item => item.close),
				type: 'line',
				itemStyle: {
					color: '#0770FF'
				},
				stack: 'a',
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(58,77,233,0.8)'
						},
						{
							offset: 1,
							color: 'rgba(58,77,233,0.3)'
						}
					])
				},
			},
			...mvavg

		]
	};
	return (
		<div className="graph">
			<h2 className="heading">Price Graph</h2>
			<label>
				<input type="checkbox" checked={value} onChange={handleChange} />
				Moving Average
			</label>
			<EChartsReact option={option} />
		</div>
	)
}
