import React from 'react'
import { Radar } from 'react-chartjs-2'

const ParamsGraph = (props) => {
	//
	const ShrinkedPopularity = props.FirstPopularity * 0.01
	const ShrinkedLoudness = (props.FirstLoudness + 10) * 0.1
	const ShrinkedTempo = (props.FirstTempo * 0.01) - 1

	const ReShPopularity = props.RePopularity * 0.01
	const ReShLoudness = (props.ReLoudness + 10) * 0.1
	const ReShTempo = (props.ReTempo * 0.01) -1

	const data = {
		labels: ['人気度','テンポ','ラウドネス', '明るさ', '踊りやすさ', 'エナジー'],
		datasets: [
			{
				label: props.trackName,
				backgroundColor: 'rgba(179,181,198,0.2)',
				borderColor: '#1db954',
				pointBackgroundColor: '#1db954',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#1db954',
				data: [ShrinkedPopularity, ShrinkedTempo, ShrinkedLoudness, props.FirstValence, props.FirstDanceAbility, props.FirstEnergy]
			},
			{
				label: props.reTrackName,
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: '#ee0077',
				pointBackgroundColor: '#ee0077',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#ee0077',
				data: [ReShPopularity, ReShTempo, ReShLoudness, props.ReValence, props.ReDanceAbility, props.ReEnergy]
			}
		]
	}
	return (
		<Radar data={data}
			width={600}
		height={600}/>
	)
	}
export default ParamsGraph;
