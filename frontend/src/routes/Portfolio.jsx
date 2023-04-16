import EChartsReact from "echarts-for-react";
import React, { useEffect, useState } from "react";

import "../styles/Portfolio.css"

export default function Portfolio() {

	const [data, setData] = useState([]);
	const [datax, setDatax] = useState([]);

	const [file, setFile] = useState(0)

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/connect/api/portfolio/${files[file].value}`)
		.then(res => res.json())
		.then(data => {
				console.log(data)
				setData(data);
		})
		.catch(err => {
				console.error("Error in fetching:", err)
		});
	}, [file])

	useEffect(() => {
		fetch('http://127.0.0.1:8000/connect/api/portfolio/portfolio_pie')
		.then(res => res.json())
		.then(data => {
				setDatax(data)
		})
		.catch(err => {
				console.log("Error in fetching:", err)
		})
	}, [])


	const option1 = {
		xAxis: {
			type: 'category',
			data: data.map(item => item.comp)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map(item => item.AAPL),
				type: 'line',
			},
			{
				data: data.map(item => item.GOOG),
				type: 'line',
			},
			{
				data: data.map(item => item.JNJ),
				type: 'line',
			},
			{
				data: data.map(item => item.KO),
				type: 'line',
			},
			{
				data: data.map(item => item.MSFT),
				type: 'line',
			},
			{
				data: data.map(item => item.NVDA),
				type: 'line',
			},
			{
				data: data.map(item => item.PG),
				type: 'line',
			},
			{
				data: data.map(item => item.TSLA),
				type: 'line',
			},
		]
	}
	const option2 = {
		xAxis: {
			type: 'category',
			data: data.map(item => item.date)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map(item => item.AAPL),
				type: 'line',
			},
			{
				data: data.map(item => item.GOOG),
				type: 'line',
			},
			{
				data: data.map(item => item.JNJ),
				type: 'line',
			},
			{
				data: data.map(item => item.KO),
				type: 'line',
			},
			{
				data: data.map(item => item.MSFT),
				type: 'line',
			},
			{
				data: data.map(item => item.NVDA),
				type: 'line',
			},
			{
				data: data.map(item => item.PG),
				type: 'line',
			},
			{
				data: data.map(item => item.TSLA),
				type: 'line',
			},
		]
	}
	const option3 = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			orient: 'vertical',
			left: 'left'
		},
		series: [
			{
				type: 'pie',
				data: datax[0] ? datax[0].value.map((el,i) => {
					return {
						"name": el,
						"value": datax[1].value[i],
					}
				}) : []
			}
		]
	}

	const option4 = {
		xAxis:  {
			type: 'category',
			data: data.map(item => item.comp),
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: data.map(item => item.value),
				type: 'bar',
				showBackground: true,
			}
		]
	}

	const files = [
		{
			label: "Risk Model Covariance",
			value: "risk_model_cov",
			option: option1,
		},
		{
			label: "Covariance Matrix",
			value: "cor_mat_normal",
			option: option1,
		},
		{
			label: "Price Chart",
			value: "all_companies_price",
			option: option2,
		},
		{
			label: "Cumulative Returns",
			value: "cum_return",
			option: option2,
		},
		{
			label: "Daily Returns",
			value: "daily_simple_return",
			option: option2,
		},
		{
			label: "Annual Standar Deviation",
			value: "ann_std_dev",
			option: option4,
		},
		{
			label: "Average Daily Returns",
			value: "avg_daily",
			option: option4,
		},
		{
			label: "Returns Per Risk",
			value: "ret_per_risk",
			option: option4,
		},
	]

	const option = {
		...files[file].option,
	};
	return (
		<div className="portfolio">
			<h1>Portfolio</h1>
			<select className="file-select" value={file} onChange={e => setFile(e.target.value)}>
				{files.map((el,i) => (
					<option key={i} value={i}>{el.label}</option>
				))}
			</select>

			<EChartsReact option={option} />
			<h2 className="heading">Ideal Portfolio</h2>
			<div className="ideal-portfolio">
				<EChartsReact option={option3} />
			</div>
		</div>
	)
}
