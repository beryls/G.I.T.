
// var h = 700;
// var w = 1000;


function renderUserProfile(user_json, repos_json) {

	// var user = [],repos = [];
	// user[0] = $.parseJSON(user_json);
	// repos[0] = $.parseJSON(repos_json);
	// console.log(repos);

	var nodes = [
	{'x': 100, 'y': 100},
	{'x': 200, 'y': 200}];

	var links = [
	{'source':0, 'target':1}];

	var w = 1280,
	    h = 800,
	    r = 6,
	    z = d3.scale.category20c();

	var force = d3.layout.force()
	    .gravity(0.06)
	    .charge(-150)
	    .linkDistance(40)
	    .size([w *= 2 / 3, h *= 2 / 3]);

	var svg = d3.select("#chart").append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	  .append("svg:g")
	    .attr("transform", "translate(" + w / 4 + "," + h / 3 + ")");

	svg.append("svg:rect")
	    .attr("width", w)
	    .attr("height", h)
	    .style("stroke", "#000");

	
	  var link = svg.selectAll("line")
	      .data(links)
	    .enter().append("svg:line");

	  var node = svg.selectAll("circle")
	      .data(nodes)
	    .enter().append("svg:circle")
	      .attr("r", r - .75)
	      .style("fill", function(d) { return z(d.group); })
	      .style("stroke", function(d) { return d3.rgb(z(d.group)).darker(); })
	      .call(force.drag);

	  force
	      .nodes(nodes)
	      .links(links)
	      .on("tick", tick)
	      .start();

	  function tick() {
	    node.attr("cx", function(d) { return d.x = Math.max(r, Math.min(w - r, d.x)); })
	        .attr("cy", function(d) { return d.y = Math.max(r, Math.min(h - r, d.y)); });

	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });
	  }
	// var svg = d3.select('#canvas_container')
	// 	.append('svg')
	// 	.attr('height', h)
	// 	.attr('width', w)
	// 	.attr('id', 'canvas');

	// var node = svg.selectAll('circle')
	// 	.data(nodes)
	// 	.enter()
	// 	.append('circle')
	// 	.attr('r',40)
	// 	.attr('fill', 'white')
	// 	.attr('stroke', 'black');

	// var force = d3.layout.force()
 //    .size([w, h]);

 //  force
 //      .nodes(nodes)
 //      .links(links)
 //      .on("tick", tick)
 //      .start();

 //  function tick() {
 //    node.attr("cx", function(d) { return d.x = Math.max(r, Math.min(w - r, d.x)); })
 //        .attr("cy", function(d) { return d.y = Math.max(r, Math.min(h - r, d.y)); });

 //    link.attr("x1", function(d) { return d.source.x; })
 //        .attr("y1", function(d) { return d.source.y; })
 //        .attr("x2", function(d) { return d.target.x; })
 //        .attr("y2", function(d) { return d.target.y; });

}
	