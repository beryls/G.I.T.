var Graph = {

	languages: { "Java": 3225, "JavaScript": 4523, "Ruby": 6570, "C++": 2427, "Perl": 5005 },
  hash_keys: [],
  hash_values: [],

  setHashKeyPairs: function() {
		for (var key in this.languages) {
			this.hash_keys.push(key);
			this.hash_values.push(this.languages[key]);
    }
  },

	renderGraphs: function() {
    $('<div>').css('height', 310)
      .css('width', 910)
      .attr('id', 'graphs_container')
      .appendTo('body');

    this.setHashKeyPairs();
    this.renderBarGraph();
          // this.renderPieChart();
  },

  renderBarGraphCanvas: function() {

    $('<div>').css('height', 0)
      .css('width', 440)
      .css('padding-bottom', 0)
      .attr('id', 'bar_graph_container')
      .appendTo('#graphs_container')
      .animate({
				height: 300
			}, 1000);

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
		.rangeRoundBands([0, w], 1/(Graph.hash_values.length * 0.5));

	var yScale = d3.scale.linear()
		.domain([0, (d3.max(Graph.hash_values) * 1.2)])
		.range([0, h]);

	svg.selectAll("rect")
	.data(Graph.hash_values)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		if(Graph.hash_values.length === 1) {
			return w/2 - 35;
		} else {
			return xScale(i);
		}
	})
	.attr('ry', 2)
	.attr('y', h)
	.attr("width", function() {
		if(Graph.hash_values.length === 1) {
			return 70;
		} else {
			return xScale.rangeBand();
		}
	})
	.attr('height', 0)
	.attr('id', function(d, i) {
		return i;
  })
	.attr("fill", function(d, i) {
		return Repo.repoColor(Graph.hash_keys[i]);
	})
	.transition()
	.delay(function(d, i){
		return 500 + 100 * i;
	})
	.duration(1000)
	.attr("height", function(d) {
		return yScale(d);
	})
	.attr("y", function(d) {
		return h - yScale(d);
	})
	.each('end', function(){
		d3.select(this)
		.on('mouseenter', function() {
			d3.select(this)
				.transition()
				.duration(100)
				.attr('fill', function() {
					return Repo.repoHover(Graph.hash_keys[this.id]);
				});
		});
		d3.select(this)
		.on("mouseleave", function() {
			d3.select(this)
			.transition()
			.duration(1000)
			.attr("fill", function(d, i) {
				return Repo.repoColor(Graph.hash_keys[this.id]);
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
		.attr('y', h)
		.attr("font-family", "sans-serif")
		.attr("font-size", 11)
		.attr("fill", "black")
		.attr('opacity', 0)
		.transition()
		.delay(function(d, i) {
			return 500 + 100 * i;
		})
		.duration(1000)
		.attr("y", function(d) {
			return h - yScale(d) - 5;
		})
		.attr('opacity', 1)
		.attr('font-size', 16);

	svg.selectAll('text')
		.data(Graph.hash_keys)
		.enter()
		.append("text")
		.text(function(d, i) {
			console.log('texting');
			return Graph.hash_values[i];
		})
		.attr("text-anchor", "middle")
		.attr("x", function(d, i) {
			return xScale(i) + xScale.rangeBand() / 2;
		})
		.attr('y', h)
		.attr("font-family", "sans-serif")
		.attr("font-size", 11)
		.attr("fill", "black")
		.attr('opacity', 0)
		.transition()
		.delay(function(d, i) {
			return 100 * i;
		})
		.duration(1000)
		.attr("y", function(d) {
			return h - yScale(hash_values[i]) - 5;
		})
		.attr('opacity', 1)
		.attr('font-size', 16);
},

};