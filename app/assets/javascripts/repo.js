function renderRepoGridCanvas(h,w) {

	$('<div>').css('height', h)
		.css('width', w)
		.attr('id', 'repos_container')
		.appendTo('body');

	var svg = d3.select('#repos_container')
		.append('svg')
		.attr('height', h)
		.attr('width', w);

	return svg;
}

function renderRepoGrid(repos) {

	var square = 60;
	var h = parseInt(repos.length / 15 + 1) * square;
	var w = 15 * 60;

	svg = renderRepoGridCanvas(h,w);

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
		.attr('width', 55)
		.attr('opacity', 0)
		.attr('fill', function(d, i) {
			return repoColor(d.main_language);
		})
		.transition()
		.duration(1250)
		.attr('height', 55)
		.attr('opacity', 1)
		.each('end', function() {
			d3.select(this).on('mouseenter', function(d) {
				d3.select(this)
					.transition()
					.duration(400)
					
					.attr('fill', function(d) {
						return repoHover(d.main_language);
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
						return repoColor(d.main_language);
					});
			});
		});

	}

function repoColor(lang) {
	if(lang === "Ruby") {return '#722124';}
	if(lang === 'JavaScript') {return '#3aa0a0';}
	if(lang === 'C++') {return '#624588';}
	else {
		return generateStringColor(lang);
	}
}

function repoHover(lang) {
	if(lang === "Ruby") {return '#ca2830';}
	if(lang === 'JavaScript') {return '#47c4c4';}
	if(lang === 'C++') {return '#8e65c5';}
	else {
		return generateStringHover(lang);
	}
}

