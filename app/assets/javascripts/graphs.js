var Graph = {

	languages: {},
  hash_keys: [],
  hash_values: [],

  setHashKeyPairs: function() {
		for (var key in this.languages) {
			this.hash_keys.push(key);
			this.hash_values.push(this.languages[key]);
    }
  },

	renderGraphs: function(user_languages) {
		$('<div>').css('height', 310)
			.css('width', 910)
			.attr('id', 'graphs_container')
			.appendTo('body');

    this.languages = user_languages;
    this.setHashKeyPairs();
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
      .attr('x', 0)
      .attr('y', 0)
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
		.rangeRoundBands([20, w - 20], 1/(Graph.hash_values.length * 0.5));
 
	var yScale = d3.scale.pow().exponent(0.2)
		.range([0, Math.pow(h,0.35)]);

	svg.selectAll("rect")
	.data(Graph.hash_values)
	.enter()
	.append("rect")
	.attr('class', 'bar')
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
		.attr('class', 'label')
		.attr('id', function(d, i){
			return i;
		})
		.transition()
		.delay(function(d, i) {
			return 500 + 100 * i;
		})
		.duration(1000)
		.attr("y", function(d) {
			return h - yScale(d) - 5;
		})
		.attr('opacity', 1)
		.attr('font-size', 16)
		.each('end', function() {
			d3.select(this)
			.on('mouseenter', function() {
				d3.select(this)
				.transition()
				.duration(250)
				.attr('y', function() {
					return h - yScale(Graph.hash_values[this.id]) - 10;
				})
				.text(Graph.hash_values[this.id]);
			})
			.on('mouseleave', function() {
				d3.select(this)
				.transition()
				.duration(500)
				.attr('y', function() {
					return h - yScale(Graph.hash_values[this.id]) - 5;
				})
				.text(Graph.hash_keys[this.id]);
			});
		});
	},

	killBarGraph: function() {
		d3.selectAll('.bar')
			.transition()
			.duration(750)
			.ease('linear')
			.attr('y', 30)
			.attr('height', 0)
			.each('end', function() {
				d3.select(this)
				.remove();
			});

		d3.selectAll('.label')
			.transition()
			.duration(750)
			.attr('y', -5)
			.each('end', function() {
				d3.select(this)
				.remove();
			});

		$('#graphs_container')
			.animate({
				height: 0,
				padding: 0
			}, 750, function() {
				$(this).remove();
			});

		this.hash_keys = [];
		this.hash_values = [];
	}
};