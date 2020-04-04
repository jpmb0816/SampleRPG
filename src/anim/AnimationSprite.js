class AnimationSprite {
	constructor(img, delayPerFrame, sequences, origin) {
		this.img = img;
		this.coordinates = [];

		let seq;
		if (sequences === null) seq = [];

		for (let y = 0, i = 0; y < img.height; y += TILE_SIZE) {
			if (sequences === null) seq.push([]);

			for (let x = 0; x < img.width; x += TILE_SIZE, i++) {
				if (sequences === null) seq[y / TILE_SIZE].push(i);
				this.coordinates.push({ x: x, y: y });
			}
		}

		if (sequences === null) sequences = seq;
		
		this.at = [];
		this.origin = origin;

		for (let i = 0; i < sequences.length; i++) {
			const delay = Number.isInteger(delayPerFrame) ? delayPerFrame : delayPerFrame[i];
			this.at.push(new AnimationThread(delay, sequences[i], this.origin));
		}
	}

	draw(id, x, y) {
		const at = this.at[id];
		c.drawImage(this.img, this.coordinates[at.i].x, this.coordinates[at.i].y, TILE_SIZE, TILE_SIZE,
			x, y, TILE_SIZE, TILE_SIZE);
		at.update();
	}

	play(id) {
		this.at[id].play();
	}

	stop(id) {
		this.at[id].stop();
	}

	getWidth(id) {
		return this.img.width;
	}

	getHeight(id) {
		return this.img.height;
	}
}