// const canvasBoundingClientRect = canvas.getBoundingClientRect();

const mouse = {
	x: 0,
	y: 0,
	hasClick: false
}

function updateMouse(e) {
	mouse.x = e.clientX; // - canvasBoundingClientRect.left;
	mouse.y = e.clientY; // - canvasBoundingClientRect.top;
}

function updateMouseClick(e) {
	mouse.hasClick = (e.type === 'mousedown') ? true : false;
}