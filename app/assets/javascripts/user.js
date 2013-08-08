function renderUserProfile(user_json, repos_json) {

	var user = $.parseJSON(user_json);
	var repos = $.parseJSON(repos_json);

	var square = 60;

	renderProfileBox(user);
	Repo.renderRepoGrid(repos);

}

function renderProfileBox(user) {

	var color = '#5f7c81';
	var hover = '#80a6ac';
	var title = function() {
		if(user['name']) {
			return user['name'];
		} else {
			return user['login'];
		}
	};

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
		.transition()
		.duration(1250)
		.attr('height', 200)
		.attr('fill', color)
		.each('end', function(){
			d3.select(this)
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
		});

	profile.append('text')
		.text(title)
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
}