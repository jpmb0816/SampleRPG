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
		const vx = -x + this.cw / 2;
		const vy = -y + this.ch / 2;

		// Clamping camera x and y so it prevents going out of map
		this.x = clamp(vx, -(this.mw - this.cw), 0);
		this.y = clamp(vy, -(this.mh - this.ch), 0);

		// Translate canvas base on camera x and y
		c.translate(this.x, this.y);

		// Update camera x and y and make it absolute value
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
	}

	stop() {
		c.setTransform(1, 0, 0, 1, 0, 0);
	}
}