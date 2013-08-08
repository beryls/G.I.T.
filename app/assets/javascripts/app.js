function generateStringColor(string) {
	if (string.length < 6) {
		while(string.length < 6) {
			string += 'ax';
		}
	}
	return 'rgb(' + Math.abs(string[0].charCodeAt(0) - string[1].charCodeAt(0)) * 3 +
					"," + Math.abs(string[2].charCodeAt(0) - string[3].charCodeAt(0)) * 4 +
					"," + Math.abs(string[4].charCodeAt(0) - string[5].charCodeAt(0)) * 5+ ")";
}

function generateStringHover(string) {
	if (string.length < 6) {
		while(string.length < 6) {
			string += 'ax';
		}
	}
	return 'rgb(' + Math.abs(string[0].charCodeAt(0) - string[1].charCodeAt(0)) * 4 +
					"," + Math.abs(string[2].charCodeAt(0) - string[3].charCodeAt(0)) * 5 +
					"," + Math.abs(string[4].charCodeAt(0) - string[5].charCodeAt(0)) * 6+ ")";
}