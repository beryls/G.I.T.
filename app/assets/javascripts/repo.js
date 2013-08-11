var Repo = {

	current_repo: "",

	renderRepoGrid: function(repos, login) {

		var square = 60,
			h = parseInt((repos.length / 15) + 1) * square,
			w = 15 * 60,
			time = repos.length * 10 + 200,
			svg = this.renderRepoGridCanvas(h,w,time);

		svg.selectAll('rect')
			.data(repos)
			.enter()
			.append('rect')
			.attr('rx', 0)
			.attr('x', function(d, i){
				return (i % 15) * square;
			})
			.attr('y', function(d, i){
				return parseInt(i / 15) * square;
			})
			.attr('height', 0)
			.attr('width', 55)
			.attr('opacity', 1)
			.attr('class', 'repo')
			.attr('fill', function(d, i) {
				return Repo.repoColor(d.main_language);
			})
			.transition()
			.delay(function(d, i){
				return i * 10;
			})
			.duration(200)
			.ease('linear')
			.attr('height', 55)
			.each('end', function() {
				d3.select(this)
				.on('mouseenter', function() {
					Repo.displayRepoInfo();
					d3.select(this)
						.transition()
						.duration(100)
						.attr('fill', function(d) {
							return Repo.repoHover(d.main_language);
					})
					.transition()
					.duration(600)
					.attr('rx', 20);
				})
				.on('mouseleave', function() {
					d3.select(this)
					.transition()
					.duration(1000)
					.attr('rx', 0)
					.attr('fill', function(d) {
						return Repo.repoColor(d.main_language);
					});
				})
				.on('click', function() {
					window.open(this.__data__.html_url)
					d3.select(this)
					.transition()
					.duration(1000)
					.attr('rx', 0)
					.attr('fill', function(d) {
						return Repo.repoColor(d.main_language);
					});
				});
			});
	},

	displayRepoInfo: function() {
		var info_box_h = 240,
			info_box_w = 890;

		d3.select('#info_box')
		.append('text')
		.attr('x', info_box_w/2)
		.attr('y', info_box_h/2)
		.text('hello');
	},

	renderRepoGridCanvas: function(h,w, time) {

		$('<div>')
			.css('height', 0)
			.css('opacity', 0)
			.attr('id', 'repos_container')
			.appendTo('#body_container')
			.animate({
				height: h,
				opacity: 1
			}, time);

		var svg = d3.select('#repos_container')
			.append('svg')
			.attr('height', h)
			.attr('width', w);
			return svg;
	},

	killRepoGrid: function() {
		var repos = d3.selectAll(".repo")[0],
		i = repos.length,
		min = 0,
		delay = 0,
		time = repos.length * 10 + 200;
		for(i; i > min; i-=1) {
			d3.select(repos[i-1])
				.transition()
				.delay(delay)
				.duration(200)
				.attr('height', 0)
				.each('end', function(){
					d3.select(this)
					.remove();
				});
			delay += 10;
		}

		$('#repos_container').animate({
			height: 0,
			padding: 0
		}, time, function() {
			$(this).remove();
		});
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