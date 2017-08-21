/* global d3 */

// Our canvas
const width = 1250,
  		height = 300,
  		margin = 20,
			marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
	.attr('height', height)


// Data reloading
let reload = () => {
	// Your data parsing here...
  let dataset = [];

	d3.tsv('afcw-results.tsv', (rows) => {
		rows.map(row => {
			dataset.push(row.GoalsScored)
		})
		console.log(dataset)
		console.log(d3.max(dataset))
		redraw(dataset)
	})
}

// redraw function
let redraw = (data) => {

	let yScale = d3.scaleLinear()
    	.domain([0, d3.max(data)])
    	.range([0, height])

	let colorScale = d3.scaleLinear()
    	.domain([0, d3.max(data)])
    	.range(['peru', 'blue'])

  let xAxis = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, data.length])

  let yAxis = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0])

  // Your data to graph here
	svg.selectAll('rect')
    	.data(data)
    	.enter()
    	.append('rect')
    	.attr('class', 'bar')
    	.attr('x', function(d, i) {
    		return i * 15 + marginLeft
    	})
    	.attr('y', function(d) {
    		return height - yScale(d)
    	})
    	.attr('width', 12)
    	.attr('height', function(d) {
    		return yScale(d)
    	})
    	.attr('fill', colorScale)

  svg.append('g')
      .attr('transform', `translate(${ marginLeft }, 0)`)
      .attr('class', 'axis')
      .call(d3.axisLeft(yAxis)
          .ticks(d3.max(data))
          .tickFormat(d3.format(".0s")))

  svg.append("g")
      .attr("transform", `translate(${ width }, 0)`)
      .attr("class", "axis")
      .call(d3.axisBottom(xAxis)
          .ticks(d3.max(data))
          .tickFormat(d3.formatPrefix(".1", 1e6)));

}

reload()
