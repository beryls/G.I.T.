function renderUserProfile(user_json, repos_json) {

	var user = [],repos;
	user[0] = $.parseJSON(user_json);
	repos = filterRepos($.parseJSON(repos_json));
	color = generateStringColor(user[0].name);
	hover = generateStringHover(user[0].name);

	var square = 60;

		$('<div>')
			.attr('id', 'profile_box')
			.appendTo('body');

		var profile = d3.select('#profile_box')
			.append('svg')
			.attr('height', 200)
			.attr('width', 200);

		profile.append('rect')
			.attr('height', 200)
			.attr('width', 200)
			.attr('fill', color)
			.attr('rx', 5)
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
			});

	renderRepoGrid(repos);

}

