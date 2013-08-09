var User = {

	renderUserProfile: function(user_json, repos_json) {

		var user = $.parseJSON(user_json),
			repos = $.parseJSON(repos_json),
			square = 60;

		this.renderProfileBox(user, repos.length);
		Repo.renderRepoGrid(repos);
		renderGraphs();

	},

	renderProfileBox: function(user,repo_count) {

		var color = '#5f7c81',
		hover = '#80a6ac',
			title = function() {
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
			.attr('y', 50);
		profile.append('text')
			.text(repo_count + " Repos")
			.attr('opacity',0)
			.attr('stroke', 'black')
			.attr('x', 100)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 20)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', 80);
	},
};
