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
	var h = parseInt(repos.length / 10 + 1) * square;
	var w = 600;

	svg = renderRepoGridCanvas(h,w);

	svg.selectAll('rect')
		.data(repos)
		.enter()
		.append('rect')
		.attr('rx', 5)
		.attr('x', function(d, i){
			return (i % 10) * square;
		})
		.attr('y', function(d, i){
			return (parseInt(i / 10) * square);
		})
		.attr('height', 55)
		.attr('width', 55)
		.attr('fill', function(d, i) {
			return repoColor(d.main_language);
		})
		.on('mouseenter', function(d) {
			d3.select(this)
				.transition()
				.duration(400)
				.attr('rx', 100)
				.attr('fill', function(d) {
					return repoHover(d.main_language);
				});
		})
		.on('mouseleave', function(d, i) {
			d3.select(this)
				.transition()
				.duration(200)
				.attr('rx', 5)
				.attr('fill', function(d) {
					return repoColor(d.main_language);
				});
		});
	}

function filterRepos(list) {
	console.log(list);
	var cleanRepos = _.reject(list, function(repo) {
		if(!repo.main_language) {
			return repo;
		}
	});
	return cleanRepos;
}

function repoColor(lang) {
	if(lang === "Ruby") {return '#722124';}
	if(lang === 'JavaScript') {return '#3aa0a0';}
	if(lang === 'C++') {return '#624588';}
	else {
		return generateColor(lang);
	}
}

function repoHover(lang) {
	if(lang === "Ruby") {return '#ca2830';}
	if(lang === 'JavaScript') {return '#47c4c4';}
	if(lang === 'C++') {return '#8e65c5';}
	else {
		return generateHover(lang);
	}
}

function generateColor(lang) {
	if (lang.length < 6) {
		while(lang.length < 6) {
			lang += 'ax';
		}
	}
	return 'rgb(' + Math.abs(lang[0].charCodeAt(0) - lang[1].charCodeAt(0)) * 3 +
					"," + Math.abs(lang[2].charCodeAt(0) - lang[3].charCodeAt(0)) * 4 +
					"," + Math.abs(lang[4].charCodeAt(0) - lang[5].charCodeAt(0)) * 5+ ")";
}

function generateHover(lang) {
	if (lang.length < 6) {
		while(lang.length < 6) {
			lang += 'ax';
		}
	}
	return 'rgb(' + Math.abs(lang[0].charCodeAt(0) - lang[1].charCodeAt(0)) * 4 +
					"," + Math.abs(lang[2].charCodeAt(0) - lang[3].charCodeAt(0)) * 5 +
					"," + Math.abs(lang[4].charCodeAt(0) - lang[5].charCodeAt(0)) * 6+ ")";
}