var User = {

	square: 60,
	color: '#00ced1',
	hover:'#88eeee',
	profile_h: 240,
	profile_w: 240,
	profile_expand_w: 890,


	renderUserProfile: function(user_json, repos_json) {

		var user = $.parseJSON(user_json),
			repos = $.parseJSON(repos_json),
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
			.attr('id', 'info_box')
			.attr('height', User.profile_h)
			.attr('width', User.profile_w);


		// appends colored rectangle to svg canvas
		// this is active space for clicking and text
		var rect = profile.append('rect')
			.attr('opacity', 0)
			.attr('fill', User.color)
			.attr('rx', 0)
			.attr('height', 0)
			.attr('width', 900)
			.attr('id', 'profile_info');

		rect.transition()
			.duration(500)
			.attr('height', 240)
			.attr('opacity', User.color)
			.each('end', function(){
				d3.select(this)
				.on('mouseover', function() {
					d3.select(this)
					.transition()
					.duration(400)
					.attr('fill', User.hover);
				})
				.on('mouseout', function() {
					d3.select(this)
					.transition()
					.duration(400)
					.attr('fill', User.color);
				})
				.on('click', function() {
					if(!d3.select('#repos_container')[0][0]) {
						Graph.killBarGraph();
						Repo.renderRepoGrid(repos, user);
						User.appendUserInfo(user, repos, title);
						User.expandInfoBox();
					} else {
						Repo.killRepoGrid();
						Graph.renderGraphs(user['lines_by_language']);
						User.contractInfoBox(title);
					}
				});
			});

		// appends name or username to profile box
		profile.append('text')
			.text(title)
			.attr('id', 'user_title')
			.attr('opacity', 0)
			.attr('stroke', 'black')
			.attr('x', User.profile_w/2)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 25)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', User.profile_h/2);

		Graph.renderGraphs(user['lines_by_language']);
	},

	expandInfoBox: function() {
		

		$('#profile_box')
			.animate({
				'width': '900px',
			}, 1250);
		d3.select('#info_box')
			.transition()
			.ease('linear')
			.duration(1000)
			.attr('width', User.profile_expand_w);
		d3.select('#user_title')
			.transition()
			.duration(400)
			.attr('opacity', 0)
			.attr('y', 0)
			.each('end', function(){
				d3.select(this)
				.remove();
			});
		
	},

	contractInfoBox: function(title){

		User.removeUserInfo();
		Repo.removeRepoInfo();
		Graph.killRepoGraph();
		
		$('#profile_box')
			.animate({
				'width': '250px',
			}, 1250);

		d3.select('#info_box')
			.transition()
			.ease('linear')
			.duration(1250)
			.attr('width', User.profile_w);
		
		d3.select('#info_box')
			.append('text')
			.text(title)
			.attr('id', 'user_title')
			.attr('opacity', 0)
			.attr('stroke', 'black')
			.attr('x', User.profile_w/2)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 25)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', User.profile_h/2);
	},

	appendUserInfo: function(user, repos, title) {
		
		d3.select('#info_box')
			.append('text')
			.text(title)
			.attr('id', 'user_title')
			.attr('opacity', 0)
			.attr('stroke', 'black')
			.attr('x', User.profile_expand_w/2)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 25)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', 90);

		d3.select('#info_box')
			.append('text')
			.text(function() {
				return (repos.length + " Repos");
			})
			.attr('id', 'repos_count')
			.attr('opacity',0)
			.attr('stroke', 'black')
			.attr('x', User.profile_expand_w/2)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 20)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', 150);
		d3.select('#info_box')
			.append('text')
			.text(user.lines_written + " Bytes of Code")
			.attr('id', 'lines_written')
			.attr('opacity',0)
			.attr('stroke', 'black')
			.attr('x', User.profile_expand_w/2)
			.attr('y', 0)
			.attr('text-anchor', 'middle')
			.attr('font-size', 20)
			.transition()
			.duration(1250)
			.attr('opacity', 1)
			.attr('y', 120);
	},

	removeUserInfo: function() {
		d3.select('#repos_count')
			.transition()
			.duration(500)
			.attr('y', 0)
			.attr('opacity', 0)
			.each('end', function(){
				d3.select(this).remove();
			});
		d3.select('#lines_written')
			.transition()
			.duration(500)
			.attr('y', 0)
			.attr('opacity', 0)
			.each('end', function(){
				d3.select(this).remove();
			});
		d3.select('#user_title')
			.transition()
			.duration(500)
			.attr('y', 0)
			.attr('opacity', 0)
			.each('end', function(){
				d3.select(this)
				.remove();
			});
	}
};
