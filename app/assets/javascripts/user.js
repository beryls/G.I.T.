var User = {

	renderUserProfile: function(user_json, repos_json) {

		var user = $.parseJSON(user_json),
			repos = $.parseJSON(repos_json),
			square = 60,
			color = '#5f7c81',
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

		var rect = profile.append('rect')
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
				})
				.on('click', function() {
					if(!d3.select('#repos_container')[0][0]) {
						Repo.renderRepoGrid(repos);
					} else {
						Repo.killRepoGrid();
					}
					if(!d3.select('#repos_count')[0][0]) {
						d3.select('#user_title')
							.transition()
							.duration(1250)
							.attr('y', 70);
						profile.append('text')
							.text(repos.length + " Repos")
							.attr('id', 'repos_count')
							.attr('opacity',0)
							.attr('stroke', 'black')
							.attr('x', 100)
							.attr('y', 0)
							.attr('text-anchor', 'middle')
							.attr('font-size', 20)
							.transition()
							.duration(1250)
							.attr('opacity', 1)
							.attr('y', 100);
						profile.append('text')
							.text(user.lines_written + " Lines")
							.attr('id', 'lines_written')
							.attr('opacity',0)
							.attr('stroke', 'black')
							.attr('x', 100)
							.attr('y', 0)
							.attr('text-anchor', 'middle')
							.attr('font-size', 20)
							.transition()
							.duration(1250)
							.attr('opacity', 1)
							.attr('y', 130);
					} else {
						d3.select('#repos_count')
							.transition()
							.duration(1250)
							.attr('opacity', 0)
							.each('end', function(){
								d3.select(this).remove();
							});
						d3.select('#lines_written')
							.transition()
							.duration(1250)
							.attr('opacity', 0)
							.each('end', function(){
								d3.select(this).remove();
							});
						d3.select('#user_title')
							.transition()
							.duration(1250)
							.attr('y', 100);
					}
				});
			});
						
		profile.append('text')
			.text(title)
			.attr('id', 'user_title')
			.attr('opacity', 0)
			.attr('stroke', 'black')
			.attr('x', 100)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 25)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', 100);
	},
};
