var Repo = {

	renderRepoGrid: function(repos) {

		var square = 60,
			h = parseInt(repos.length / 15 + 1) * square,
			w = 15 * 60;
		var svg = this.renderRepoGridCanvas(h,w);

		svg.selectAll('rect')
			.data(repos)
			.enter()
			.append('rect')
			.attr('rx', 3)
			.attr('x', function(d, i){
				return (i % 15) * square;
			})
			.attr('y', function(d, i){
				return parseInt(i / 15) * square;
			})
			.attr('height', 0)
			.attr('width', 0)
			.attr('opacity', 1)
			.attr('fill', function(d, i) {
				return Repo.repoColor(d.main_language);
			})
			.transition()
			.delay(function(d, i){
				return i * 10;
			})
			.duration(1250)
			.attr('width', 55)
			.attr('height', 55)
			.each('end', function() {
				d3.select(this).on('mouseenter', function(d) {
					d3.select(this)
						.transition()
						.duration(400)
						
						.attr('fill', function(d) {
							return Repo.repoHover(d.main_language);
					})
					.transition()
					.duration(600)
					.attr('rx', 25);
				})
				.on('mouseleave', function(d, i) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('rx', 3)
					.attr('fill', function(d) {
						return Repo.repoColor(d.main_language);
					});
				});
			});
	},

	renderRepoGridCanvas: function(h,w) {

		$('<div>').css('height', h)
			.css('width', w)
			.attr('id', 'repos_container')
			.appendTo('body');

		var svg = d3.select('#repos_container')
			.append('svg')
			.attr('height', h)
			.attr('width', w);

		return svg;
	},

	repoColor: function(lang) {
		if(lang === "Ruby") {return '#722124';}
		if(lang === 'JavaScript') {return '#3aa0a0';}
		if(lang === 'C++') {return '#624588';}
		else {
			return generateStringColor(lang);
		}
	},

	repoHover: function(lang) {
		if(lang === "Ruby") {return '#ca2830';}
		if(lang === 'JavaScript') {return '#47c4c4';}
		if(lang === 'C++') {return '#8e65c5';}
		else {
			return generateStringHover(lang);
		}
	}

};