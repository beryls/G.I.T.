function renderUserProfile(user_json, repos_json) {

	var user = [],repos;
	user[0] = $.parseJSON(user_json);
	repos = $.parseJSON(repos_json);
	console.log(repos);

	var square = 60

	var h = parseInt(repos.length / 10 + 1) * square;
	var w = 600;

	$('<div>').css('height', h)
		.css('width', w)
		.attr('id', 'canvas_container')
		.appendTo('body');

	var svg = d3.select('#canvas_container')
		.append('svg')
		.attr('height', h)
		.attr('width', w);

	svg.selectAll('rect')
		.data(repos)
		.enter()
		.append('rect')
		.attr('x', function(d, i){
			return (i % 10) * square;
		})
		.attr('y', function(d, i){
			return (parseInt(i / 10) * square);
		})
		.attr('height', 55)
		.attr('width', 55)
		.attr('fill', 'black')
		.on('mouseenter', function(d) {
			d3.select(this)
				.transition()
				.duration(200)
				.attr('fill', 'blue')
				.attr('height', square)
				.attr('width', square);
		})
		.on('mouseleave', function(d, i) {
			d3.select(this)
				.transition()
				.duration(200)
				.attr('fill', 'black')
				.attr('height', 55)
				.attr('width', 55);
		});

}

	