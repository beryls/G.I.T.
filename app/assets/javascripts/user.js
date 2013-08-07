var canvas = d3.select('#canvas');

function renderUserProfile(user_json) {
	canvas.selectAll('circle')
	.append('circle')
	.attr('cx', 40)
	.attr('cy', 40)
	.attr('r', 30)
	.attr('fill', 'black');
}