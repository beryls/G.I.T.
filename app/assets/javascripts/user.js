
var h = 700;
var w = 1000;


function renderUserProfile(user_json) {

	var data = [];
	data[0] = $.parseJSON(user_json);

	var canvas = d3.select('#canvas_container')
	.append('svg')
	.attr('height', h)
	.attr('width', w)
	.attr('id', 'canvas');

	circle = canvas.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
	.attr('cx', w/2)
	.attr('cy', h/6)
	.attr('r', 100)
	.attr('fill', '#69d3ff');

	
	circle.on('click', function() {
		if(this.attributes.r.textContent == 100) {
			d3.select(this)
			.transition()
			.duration(1000)
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('r', 200);
		} else {
			d3.select(this)
			.transition()
			.duration(1000)
			.attr('cx', w/2)
			.attr('cy', h/6)
			.attr('r', 100);
		}
	});

}