function generateStringColor(string) {
	if (string.length < 6) {
		while(string.length < 6) {
			string += 'ax';
		}
	}
	var r = Math.abs(string[0].charCodeAt(0) - string[1].charCodeAt(0)) * 3;
	var g = Math.abs(string[2].charCodeAt(0) - string[3].charCodeAt(0)) * 3;
	var b = Math.abs(string[4].charCodeAt(0) - string[5].charCodeAt(0)) * 3;
	colors = [r,b,g];
	colors = _.map(colors, function(value) {
		if(value > 150) {
			return 150;
		} else if (value === 0) {
			return 100;
		}
		return value;
	});
	console.log(colors);
	return "rgb(" + colors[0] + ',' + colors[1] + ',' + colors[2] + ')';
}

function generateStringHover(string) {
	if (string.length < 6) {
		while(string.length < 6) {
			string += 'ax';
		}
	}
	var r = Math.abs(string[0].charCodeAt(0) - string[1].charCodeAt(0)) * 5;
	var g = Math.abs(string[2].charCodeAt(0) - string[3].charCodeAt(0)) * 5;
	var b = Math.abs(string[4].charCodeAt(0) - string[5].charCodeAt(0)) * 5;
	colors = [r,b,g];
	colors = _.map(colors, function(value) {
		if(value > 150) {
			return 150;
		} else if (value === 0) {
			return 100;
		}
		return value;
	});
	console.log(colors);
	return "rgb(" + colors[0] + ',' + colors[1] + ',' + colors[2] + ')';
}