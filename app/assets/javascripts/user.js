function renderUserProfile(user_json, repos_json) {


	var user = $.parseJSON(user_json);
	var repos = filterRepos($.parseJSON(repos_json));
	var color = '#ae5325';
	var hover = '#df6a30';

	console.log(color);

	var square = 60;

		$('<div>')
			.attr('id', 'profile_box')
			.appendTo('body');

		var profile = d3.select('#profile_box')
			.append('svg')
			.attr('height', 200)
			.attr('width', 200);

		profile.append('rect')
			.attr('fill', 'white')
			.attr('rx', 5)
			.attr('height', 0)
			.attr('width', 200)
			.on('mouseover', function() {
				d3.select(this)
				.transition()
				.duration(400)
				.attr('fill', hover);
			})
			.on('mouseout', function() {
				d3.select(this)
				.transition()
				.duration(400)
				.attr('fill', color);
			})
			.transition()
			.duration(1250)
			.attr('height', 200)
			.attr('fill', color);

		profile.append('text')
			.text(user.name)
			.attr('opacity', 0)
			.attr('stroke', 'black')
			.attr('x', 100)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 25)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', 40);

	renderRepoGrid(repos);

}

