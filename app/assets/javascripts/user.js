
var h = 700;
var w = 1000;


function renderUserProfile(user_json, repos_json) {

	var user = [],repos = [];
	user[0] = $.parseJSON(user_json);
	repos[0] = $.parseJSON(repos_json);
	console.log(repos);

	var canvas = d3.select('#canvas_container')
	.append('svg')
	.attr('height', h)
	.attr('width', w)
	.attr('id', 'canvas');

	var force = d3.layout.force()
    .nodes(repos)
    .links([])
    .size([w, h])
    .start();

var node = canvas.selectAll("circle.node")
    .data(repos)
		.enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", 8)
    .style("fill", 'white')
    .style("stroke", 'black' )
    .style("stroke-width", 1.5)
    .call(force.drag);

	// circle = canvas.selectAll('circle')
	// .data(data)
	// .enter()
	// .append('circle')
	// .attr('cx', w/2)
	// .attr('cy', h/6)
	// .attr('r', 100)
	// .attr('fill', '#69d3ff');

	
	// circle.on('click', function() {
	// 	if(this.attributes.r.textContent == 100) {
	// 		d3.select(this)
	// 		.transition()
	// 		.duration(1000)
	// 		.attr('cx', 0)
	// 		.attr('cy', 0)
	// 		.attr('r', 200);
	// 	} else {
	// 		d3.select(this)
	// 		.transition()
	// 		.duration(1000)
	// 		.attr('cx', w/2)
	// 		.attr('cy', h/6)
	// 		.attr('r', 100);
	// 	}
	// });

}