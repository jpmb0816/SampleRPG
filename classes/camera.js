class Camera {
	constructor(cw, ch, mw, mh) {
		this.cw = cw;
		this.ch = ch;
		this.mw = mw;
		this.mh = mh;
		this.x = 0;
		this.y = 0;
	}

	// Update camera based on x and y
	update(x, y) {
		// Camera x and y
		let vx = -x + this.cw / 2;
		let vy = -y + this.ch / 2;

		// Clamping camera x and y so it prevents going out of map
		let cx = this.clamp(vx, -(this.mw - this.cw), 0);
		let cy = this.clamp(vy, -(this.mh - this.ch), 0);

		// Translate canvas base on camera x and y
		translate(cx, cy);
	}

	start() {
		// Save
		applyMatrix(1, 0, 0, 1, 0, 0);
	}

	stop() {
		// Restore
		resetMatrix();
	}

	// Clamping value
	clamp(value, min, max) {
		if (value < min) return min;
		else if (value > max) return max;
		return value;
	}
}