import React from 'react'
import { Radar } from 'react-chartjs-2'

const ParamsGraph = React.memo((props) => {
	const ShrinkedPopularity = props.FirstPopularity * 0.01
	const ShrinkedLoudness = (props.FirstLoudness + 10) * 0.1
	const ShrinkedTempo = (props.FirstTempo * 0.01) - 1

	const ReShPopularity = props.RePopularity * 0.01
	const ReShLoudness = (props.ReLoudness + 10) * 0.1
	const ReShTempo = (props.ReTempo * 0.01) -1

	const data = {
		labels: ['人気度', 'テンポ', 'ラウドネス', '明るさ', '踊りやすさ', 'エナジー'],
		datasets: [
			{
				label: props.trackName,
				backgroundColor: 'rgba(29,185,84,0.7)',
				borderColor: '#1db954',
				borderWidth: 1,
				pointBackgroundColor: '#1db954',
				pointBorderColor: '#1db954',
				pointHitRadius: '3',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#1db954',
				pointRadius: 0,
				data: [ShrinkedPopularity, ShrinkedTempo, ShrinkedLoudness, props.FirstValence, props.FirstDanceAbility, props.FirstEnergy]
			},
			{
				label: props.reTrackName,
				backgroundColor: 'rgba(219,93,254,0.4)',
				borderColor: '#db5dfe',
				borderWidth: 1,
				pointBackgroundColor: '#db5dfe',
				pointBorderColor: '#db5dfe',
				pointHitRadius: '3',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#db5dfe',
				pointRadius: 0,
				data: [ReShPopularity, ReShTempo, ReShLoudness, props.ReValence, props.ReDanceAbility, props.ReEnergy]
				}
		]
	}
	const myOptions = {
		layout: {
			padding: 30
		},
		scale: {
			angleLines: {
				color: 'rgba(252,252,255,0.1)'
			},
      gridLines: {
				color: ['#DF0869'],
				drawBorder: true,
      },
      pointLabels :{
        fontSize: 15,
      },
      ticks: {
				display: false,
				maxTicksLimit: 1,
      }
    }
  }
	return (
		<Radar data={data}
			options={myOptions}
			width={600}
			height={600}/>
	)
	})
export default ParamsGraph;
