var Graph = {

	hash1: { "Java": 3225, "JavaScript": 4523, "Ruby": 6570, "C++": 2427, "Perl": 5005 },
  hash_keys: ['Java', 'JavaScript', 'Ruby', 'C++', 'Perl'],
  hash_values: [3225, 4523, 6570, 2427, 5005],

  testValues: function() {
		for (var key in hash1) {
			this.hash_keys.push(key);
			this.hash_values.push(hash1[key]);
    }
  },

	renderGraphs: function() {
    $('<div>').css('height', 310)
      .css('width', 910)
      .attr('id', 'graphs_container')
      .appendTo('body');

    this.renderBarGraph();
          // this.renderPieChart();
  },

  renderBarGraphCanvas: function() {

    $('<div>').css('height', 300)
      .css('width', 440)
      .attr('id', 'bar_graph_container')
      .appendTo('#graphs_container');

    var svg = d3.select('#bar_graph_container')
      .append('svg')
      .attr('height', 300)
      .attr('width', 440);

    return svg;
  },

	renderBarGraph: function() {
		var h = 300;
		var w = 440;

	svg = this.renderBarGraphCanvas();

	var xScale = d3.scale.ordinal()
		.domain(d3.range(Graph.hash_values.length))
		.rangeRoundBands([0, w], 1/(Graph.hash_values.length));

	var yScale = d3.scale.linear()
		.domain([0, d3.max(Graph.hash_values)])
		.range([0, h]);
	console.log(Graph.hash_values);
	svg.selectAll("rect")
		.data(Graph.hash_values)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return xScale(i);
		})
		.attr('y', h)
		.attr("width", xScale.rangeBand())
		.attr('height', 0)
		.attr("fill", function(d, i) {
			return Repo.repoColor(Graph.hash_keys[i]);
		})
		.transition()
		.delay(function(d, i){
			return 100 * i;
		})
		.duration(1000)
		.attr("height", function(d) {
			return yScale(d);
		})
		.attr("y", function(d) {
			return h - yScale(d);
		}).each('end', function(i){
			d3.select(this)
			.on("mouseover", function(d, i) {
				console.log(i);
				d3.select(this)
				.transition()
				.duration(250)
				.attr("fill", function(d, i) {
					console.log(i);
				});
			})
			.on("mouseout", function(d, i) {
				d3.select(this)
				.transition()
				.duration(250)
				.attr("fill", function(d, i) {
					console.log(i);
				});
			});
		});

		//Create labels
		svg.selectAll("text")
			.data(Graph.hash_values)
			.enter()
			.append("text")
			.text(function(d, i) {
				return Graph.hash_keys[i];
			})
			.attr("text-anchor", "middle")
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
			})
			.attr("y", function(d) {
				return h - yScale(d) + 14;
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "white");
},

};