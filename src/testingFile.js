const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const ChartJS = require('chart.js');

const ChartDataLabels = require('chartjs-plugin-datalabels');

const annotationPlugin = require('chartjs-plugin-annotation');

const fs = require('fs');

const width = 700; //px
const height = 400; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp

let data = '';
const checking = async () => {
	const chartJSNodeCanvas = new ChartJSNodeCanvas({
		width,
		height,
		backgroundColour,
		plugins: {
			requireLegacy: ['chartjs-plugin-datalabels'],
			modern: ['chartjs-plugin-annotation'],
		},
	});
	const backgroundOptions = {
		plugins: {
			autocolors: false,
			annotation: {
				annotations: {
					box1: {
						type: 'box',
						xMin: 1,
						xMax: 2,
						yMin: 50,
						yMax: 70,
						backgroundColor: 'rgba(255, 99, 132, 0.25)',
					},
				},
			},
		},
	};

	const configuration = {
		type: 'line',

		data: {
			labels: [1, 2, 3, 4, 5],
			datasets: [
				{
					label: '',

					// backgroundColor: 'red',
					// borderColor: 'red',
					data: [80.8, 95, 90, 80, 95],
					// align part for positioning
					datalabels: {
						align: 'end',
						anchor: 'start',
					},
				},
			],
		},
		options: {
			indexAxis: 'x',
			plugins: {
				datalabels: {
					backgroundColor: 'transparent',
					size: 50,
					borderRadius: 20,
					color: '#666666',

					font: {
						weight: 'bold',
						size: 20,
					},
					//formatter: Math.round,
					padding: 10,
				},
				legend: {
					display: true,
				},
				annotation: {
					annotations: {
						box1: {
							type: 'box',
							xMax: 85,
							xMin: 55,
							backgroundColor: 'rgba(76, 253, 156, 0.25)',
							drawTime: 'beforeDatasetsDraw',

							borderColor: 'transparent',
						},
						box2: {
							type: 'box',
							xMax: 85,
							drawTime: 'beforeDatasetsDraw',

							backgroundColor: 'rgba(204, 255, 204, 1)',
							borderColor: 'transparent',
						},
						box3: {
							type: 'box',
							xMin: 55,
							drawTime: 'beforeDatasetsDraw',

							backgroundColor: 'rgba(255, 99, 132, 0.25)',
							borderColor: 'transparent',
						},
					},
				},
			},

			// Core options
			aspectRatio: 6 / 3,
			layout: {
				padding: {
					top: 32,
					right: 26,
					bottom: 16,
					left: 26,
				},
			},
			elements: {
				line: {
					fill: false,
					tension: 0.3,
					borderColor: 'rgb(75, 192, 192)',
					borderWidth: 3,
				},
				point: {
					pointStyle: 'circle',
					radius: 5,
					// borderColor: 'rgb(75, 192, 192)',
					fill: true,
					backgroundColor: function (context) {
						// console.log(context.dataset.data[context.dataIndex]);

						return context.dataset.data[context.dataIndex] > 85
							? 'red'
							: 'green';
					},
				},
			},
			scales: {
				y: {
					stacked: true,
					// beginAtZero: true,
					// min , max for setting lower and higher values of axis .
					// min: 40,
					// max: 115,

					ticks: {
						display: true,
						stepSize: 15,
						font: {
							size: 15,
							weight: 'bold',
						},
					},
					offset: true,

					grid: {
						display: true,
						color: 'white',
						borderColor: 'rgb(75, 192, 192)',
						// tickColor: 'rgb(75, 192, 192)',
						// borderWidth: '',
					},
					// display: true,
				},
				// for getting two axis
				// y1: {
				// 	min: 40,
				// 	max: 115,
				// 	type: 'linear',
				// 	display: true,
				// 	position: 'right',

				// 	// grid line settings
				// 	grid: {
				// 		drawOnChartArea: false, // only want the grid lines for one axis to show up
				// 		// borderColor: function (value, index) {
				// 		// 	console.log(value, index);
				// 		// },
				// 		display: false,
				// 	},
				// 	ticks: {
				// 		stepSize: 15,
				// 		callback: function (value, index) {
				// 			if (value == 85) {
				// 				return value;
				// 			}
				// 		},
				// 		align: 'center',
				// 		crossAlign: 'near',
				// 		backdropColor: function (value, index) {
				// 			return value.tick.value > 75 ? 'red' : 'green';
				// 			// console.log(value);
				// 		},
				// 		showLabelBackdrop: true,
				// 		color: 'white',
				// 		backdropPadding: 5,
				// 		drawTicks: false,
				// 	},
				// },
				x: {
					beginAtZero: true,
					// stacked: true,
					offset: true,

					// max: 15,
					grid: {
						display: true,
						color: 'white',
						borderColor: 'rgb(75, 192, 192)',
						tickColor: 'rgb(75, 192, 192)',
						// borderWidth: 10,
						borderDashOffset: 5,
						borderDash: [5, 15],
					},
					ticks: {
						font: {
							size: 19,
						},
						color: 'rgb(75, 192, 192)',
						drawTicks: true,
						tickColor: 'rgb(75, 192, 192)',
						major: true,
					},
				},
			},
			//  increase pixel ratio
			devicePixelRatio: 5,
		},
	};
	const image = await chartJSNodeCanvas.renderToBufferSync(configuration);
	const dataUrl = chartJSNodeCanvas.renderToDataURL(configuration);
	const stream = chartJSNodeCanvas.renderToStream(configuration);
	// console.log(dataUrl);
	// fs.writeFileSync('testing.txt', image.toString('base64'));

	fs.writeFile(
		'image.jpeg',
		image.toString('base64'),
		{ encoding: 'base64' },
		function (err) {
			console.log('File created');
		}
	);

	return image;
};

checking();

/*
For writing suggested max values we need to check following conditions

if max value is less than 10 
then we will add by 1

max value >10
we will add by10


*/
