var User = {

	renderUserProfile: function(user_json, repos_json) {

		var user = $.parseJSON(user_json),
			repos = $.parseJSON(repos_json),
			square = 60,
			color = '#465b5e',
			hover = '#5f7c81',
			profile_h = 240,
			profile_w = 240,
			title = function() {
				if(user['name']) {
					return user['name'];
				} else {
					return user['login'];
				}
			};

		// appends profile box div to page
		$('<div>')
				.attr('id', 'profile_box')
				.css('height', 0)
				.appendTo('#body_container')
				.animate({
					height: 250,
					opacity: 1,
					padding: 5
				},500);


		// appends svg canvas to profile box div
		var profile = d3.select('#profile_box')
			.append('svg')
			.attr('height', profile_h)
			.attr('width', profile_w);


		// appends colored rectangle to svg canvas
		// this is active space for clicking and text
		var rect = profile.append('rect')
			.attr('opacity', 0)
			.attr('fill', color)
			.attr('rx', 0)
			.attr('height', 0)
			.attr('width', 240)
			.transition()
			.duration(500)
			.attr('height', 240)
			.attr('opacity', color)
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
						Graph.killBarGraph();
						Repo.renderRepoGrid(repos, user.login);
					} else {
						Repo.killRepoGrid();
						Graph.renderGraphs(user['lines_by_language']);
					}
					if(!d3.select('#repos_count')[0][0] && !d3.select('#lines_written')[0][0]) {
						d3.select('#user_title')
							.transition()
							.duration(1250)
							.attr('y', 90);
						profile.append('text')
							.text(repos.length + " Repos")
							.attr('id', 'repos_count')
							.attr('opacity',0)
							.attr('stroke', 'black')
							.attr('x', profile_w/2)
							.attr('y', 0)
							.attr('text-anchor', 'middle')
							.attr('font-size', 20)
							.transition()
							.duration(1250)
							.attr('opacity', 1)
							.attr('y', 120);
						profile.append('text')
							.text(user.lines_written + " Lines")
							.attr('id', 'lines_written')
							.attr('opacity',0)
							.attr('stroke', 'black')
							.attr('x', profile_w/2)
							.attr('y', 0)
							.attr('text-anchor', 'middle')
							.attr('font-size', 20)
							.transition()
							.duration(1250)
							.attr('opacity', 1)
							.attr('y', 150);
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
							.attr('y', profile_h/2);
					}
				});
			});
		
		// appends name or username to profile box
		profile.append('text')
			.text(title)
			.attr('id', 'user_title')
			.attr('opacity', 0)
			.attr('stroke', 'black')
			.attr('x', profile_w/2)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 25)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', profile_h/2);

		Graph.renderGraphs(user['lines_by_language']);			
	},
};
