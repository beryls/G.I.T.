var Graph = {

	languages: {},
  hash_keys: [],
  hash_values: [],
  hash_ints: [],
  total_bytes: 0,

  setHashKeyPairs: function() {
    this.hash_keys = [];
    this.hash_values = [];
		for (var key in this.languages) {
			this.hash_keys.push(key);
			this.hash_values.push(this.languages[key]);
    }
  },

  valueConvert: function() {
		hash_ints = [];
		this.total_bytes = 0;
		for (i = 0; i < this.hash_values.length; i++) {
			var bytes = parseInt(this.hash_values[i]);
			this.hash_ints.push(bytes);
			this.total_bytes += bytes;
		}
	},

	renderGraphs: function(user_languages) {

		// console.log(user_languages);

		$('<div>').css('height', 310)
			.css('width', 1000)
			.attr('id', 'graphs_container')
			.appendTo('#body_container');

    this.languages = user_languages;
    this.setHashKeyPairs();
    this.valueConvert();
    this.renderBarGraph();
    this.renderPieChart();
  },

  renderBarGraphCanvas: function() {

		$('<div>').css('height', 0)
      .css('width', 480)
      .attr('id', 'bar_graph_container')
      .appendTo('#graphs_container')
      .animate({
				height: 300,
      },1250);

    var svg = d3.select('#bar_graph_container')
      .append('svg')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', 300)
      .attr('width', 480);

      svg.append('span')
				.attr('class', 'glyphicon glyphicon-chevron-down');
    return svg;
  },

	renderBarGraph: function() {
		var h = 300,
		w = 480;

		svg = this.renderBarGraphCanvas();

		var xScale = d3.scale.ordinal()
			.domain(d3.range(Graph.hash_values.length))
			.rangeRoundBands([40, w - 40], 1/(Graph.hash_values.length * 0.5));

		var exp_calc = 1/(Math.log(d3.max(this.hash_ints))/Math.log(250));

		var yScale = d3.scale.pow().exponent(exp_calc)
			.range([0, 1]);

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
						svg.append("text")
						.text(Graph.hash_keys[this.id])
						.attr("text-anchor", "middle")
						.attr("x", xScale(this.id) + xScale.rangeBand() / 2)
						.attr("y", h - yScale(Graph.hash_values[this.id]) - 25)
						.attr("font-family", "sans-serif")
						.attr("font-size", 18)
						.attr("fill", "black")
						.attr('opacity', 0)
						.attr('class', 'bar_label')
						.transition()
						.duration(250)
						.attr('opacity', 1);

						svg.append("text")
						.text(Graph.hash_values[this.id] + ' Bytes')
						.attr("text-anchor", "middle")
						.attr("x", xScale(this.id) + xScale.rangeBand() / 2)
						.attr("y", h - yScale(Graph.hash_values[this.id]) - 5)
						.attr("font-family", "sans-serif")
						.attr("font-size", 18)
						.attr("fill", "black")
						.attr('opacity', 0)
						.attr('class', 'bar_label')
						.transition()
						.duration(250)
						.attr('opacity', 1);

				});
				d3.select(this)
				.on("mouseleave", function() {
					d3.select(this)
					.transition()
					.duration(1000)
					.attr("fill", function(d, i) {
						return Repo.repoColor(Graph.hash_keys[this.id]);
					});
					d3.selectAll('.bar_label')
						.transition()
						.duration(500)
						.attr('opacity', 0)
						.each('end', function() {
							d3.select(this)
								.remove();
						});
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
			.attr('opacity', 0)
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
    this.total_bytes = 0;
	},


	renderPieChartCanvas: function() {

    $('<div>').css('height', 0)
      .css('width', 480)
      .css('opacity', 0)
      .attr('id', 'pie_chart_container')
      .appendTo('#graphs_container')
      .animate({
				height: 300,
				opacity: 1
      }, 1250);

    var svg = d3.select('#pie_chart_container')
      .append('svg')
      .attr('height', 300)
      .attr('width', 480);

    return svg;
  },

  renderPieChart: function() {
    var h = 300;
    var w = 480;

    pie_svg = this.renderPieChartCanvas();

    var outerRadius = h/2 - 30;
    var innerRadius = 0;

    var arcStart = d3.svg.arc()
      .outerRadius(0);

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var arcOver = d3.svg.arc()
      .outerRadius(outerRadius + 10);

    var pie = d3.layout.pie();

    //Set up groups
    var arcs = pie_svg.selectAll("g.arc")
            .data(pie(Graph.hash_values))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + w/2 + "," + h/2 + ")");


    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
          return Repo.repoColor(Graph.hash_keys[i]);
        })
        .attr("d", arcStart)
        .attr("id", function(d, i) {
          return i;
        })
        .transition()
         .delay(function(d, i) {
          return 500 + 50 * i;
         })
         .duration(1000)
         .attr("d", arc)
         .each("end", function() {
           d3.select(this)
           .on("mouseenter", function(d, i) {
            console.log(Graph.total_bytes);
            console.log(Graph.hash_keys[this.id] + ": " + (d.value/Graph.total_bytes * 100).toFixed(2) + "%");
             d3.select(this)
              .transition()
              .duration(500)
              .attr("fill", Repo.repoHover(Graph.hash_keys[this.id]))
              .attr("d", arc.outerRadius(outerRadius + 10));
              arcs.append("text")
              .attr("transform", function() {
                var c = arc.centroid(d);
                var x = c[0];
                var y = c[1];
                var dist = Math.sqrt(x*x + y*y);
                return "translate(" + (x/dist * (outerRadius + 15)) +  ',' + (y/dist * (outerRadius + 15)) +  ")";
              })
              .transition()
            	.attr('opacity', 0)
              .attr("text-anchor", "middle")
              .attr("class", "percent-label")
              .text(Graph.hash_keys[this.id] + ": " + (d.value/Graph.total_bytes * 100).toFixed(2) + "%")
              .attr("font-family", "sans-serif")
							.attr("font-size", "18")
							.attr("fill", "black")
							.transition()
							.duration(2000)
							.attr('opacity', 3/Graph.hash_keys.length);
							})
           .on("mouseout", function(d, i) {
             d3.selectAll(".percent-label").remove();
             d3.select(this)
              .transition()
              .duration(1000)
              .attr("fill", Repo.repoColor(Graph.hash_keys[this.id]))
              .attr("d", arc.outerRadius(outerRadius));
            });
          });
  },

  renderRepoGraph: function(languages) {
		this.languages = languages;
    this.setHashKeyPairs();
    this.valueConvert();

    var h = 100,
			w = 290;

    svg = d3.select('#info_box')
			.append('svg')
			.attr('id', 'repo_graph')
			.attr('height', '100')
			.attr('width', 290)
			.attr('x', 300)
			.attr('y', 140);

		var xScale = d3.scale.ordinal()
			.domain(d3.range(Graph.hash_values.length))
			.rangeRoundBands([10, w - 10], 1/(Graph.hash_values.length));

		var exp_calc = 1/(Math.log(d3.max(this.hash_ints))/Math.log(100));

		var yScale = d3.scale.pow().exponent(exp_calc)
			.range([0, 1]);

		svg.selectAll("rect")
		.data(Graph.hash_values)
		.enter()
		.append("rect")
		.attr('class', 'bar')
		.attr("x", function(d, i) {
			return xScale(i);
		})
		.attr('y', h)
		.attr("width", function() {
			return xScale.rangeBand();
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
						svg.append("text")
						.text(Graph.hash_keys[this.id])
						.attr("text-anchor", "middle")
						.attr("x", xScale(this.id) + xScale.rangeBand() / 2)
						.attr("y", h - yScale(Graph.hash_values[this.id]) - 25)
						.attr("font-family", "sans-serif")
						.attr("font-size", 10)
						.attr("fill", "black")
						.attr('opacity', 0)
						.attr('class', 'bar_label')
						.transition()
						.duration(250)
						.attr('opacity', 1);

						svg.append("text")
						.text(Graph.hash_values[this.id] + ' Btyes')
						.attr("text-anchor", "middle")
						.attr("x", xScale(this.id) + xScale.rangeBand() / 2)
						.attr("y", h - yScale(Graph.hash_values[this.id]) - 5)
						.attr("font-family", "sans-serif")
						.attr("font-size", 10)
						.attr("fill", "black")
						.attr('opacity', 0)
						.attr('class', 'bar_label')
						.transition()
						.duration(250)
						.attr('opacity', 1);

				});
				d3.select(this)
				.on("mouseleave", function() {
					d3.select(this)
					.transition()
					.duration(1000)
					.attr("fill", function(d, i) {
						return Repo.repoColor(Graph.hash_keys[this.id]);
					});
					d3.selectAll('.bar_label')
						.transition()
						.duration(500)
						.attr('opacity', 0)
						.each('end', function() {
							d3.select(this)
								.remove();
						});
				});
			});
  },


  killRepoGraph: function(){
		d3.select('#repo_graph')
		.transition()
		.duration(400)
		.attr('height', 0)
		.attr('opacity', 0)
		.each('end', function() {
			d3.select(this)
			.remove();
		});
    this.languages = {};
	}
};