import React from 'react'
import { Radar } from 'react-chartjs-2'

const ParamsGraph = (props) => {
	const ShrinkedPopularity = props.FirstPopularity * 0.01
	const ShrinkedLoudness = (props.FirstLoudness + 10) * 0.1
	const ShrinkedTempo = (props.FirstTempo * 0.01) - 1
	const data = {
		labels: ['Popularity','Speedy','Loudness', 'Valance', 'Dancablity', 'Energy'],
		datasets: [
			{
				label: props.trackName,
				backgroundColor: 'rgba(179,181,198,0.2)',
				borderColor: 'rgba(179,181,198,1)',
				pointBackgroundColor: 'rgba(179,181,198,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(179,181,198,1)',
				data: [ShrinkedPopularity, ShrinkedTempo, ShrinkedLoudness, props.FirstValence, props.FirstDanceAbility, props.FirstEnergy]
			},
			{
				label: 'My Second dataset',
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				pointBackgroundColor: 'rgba(255,99,132,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(255,99,132,1)',
				data: [0.2, 0.8, 0.3, 0.5, 0.2, 0.5]
			}
		]
	}
	return (
		<div>
			<p>{props.trackName}'s BPM : {props.FirstTempo}</p>
		<Radar data={data}
		width={300}
		height={ 300}/>
		</div>
	)
	}
export default ParamsGraph;
