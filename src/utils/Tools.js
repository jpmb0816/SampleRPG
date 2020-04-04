/**************************************************
 *                                                *
 *                Extra Functions                 *
 *                                                *
 **************************************************/

// Create canvas and append to HTML Body
function createCanvas(w, h) {
	if (canvas !== undefined) {
		canvas.parentElement.removeChild(canvas);
	}

	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	c = canvas.getContext('2d');
	canvas.width = w;
	canvas.height = h;
	width = w;
	height = h;
}

// Loading image asynchronously and append to resource manager
function loadImage(data) {
	return new Promise(resolve => {
		const image = new Image();
		// When done loading image
		image.addEventListener('load', () => {
			if (data.multiSprite) sm.addMultiSprite(data.name, image, data.width, data.height);
			else sm.add(data.name, image);

			resolve();
		});
		image.src = data.path;
	});
}

// Load all images in list
function loadAllSprites(list) {
	const promises = [];

	list.forEach(data => promises.push(loadImage(data)));

	return Promise.all(promises);
}

// Load JSON asynchronously
function loadJSON(url) {
	return new Promise(resolve => {
		const xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resolve(JSON.parse(this.responseText));
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	});
}

// Grid to coordinate converter
function gridToCoordinate(n) {
	const r = n * TILE_SIZE;
	return r - r % TILE_SIZE;
}

// Coordinate to grid converter
function coordinateToGrid(n) {
	return Math.floor(n / TILE_SIZE);
}

// Get current time in hh:mm:ss format
function getCurrentTime() {
	const time = performance.now() / 1000;
	const secs = Math.floor(time % 60);
	const mins = Math.floor((time / 60) % 60);
	const hrs = Math.floor(time / 60 / 60);

	return { hrs: (hrs < 10 ? '0' : '') + hrs,
		mins: (mins < 10 ? '0' : '') + mins,
		secs: (secs < 10 ? '0' : '') + secs};
}

// Get percentage of value based on max
function getPercentage(val, max) {
	return Math.floor((val / max) * 100);
}

// Scaled to new number
function scaleValue(v, s1, e1, s2, e2) {
	return (v - s1) / (e1 - s1) * (e2 - s2) + s2;
}

// Clam value
function clamp(value, min, max) {
	if (value < min) return min;
	else if (value > max) return max;
	return value;
}