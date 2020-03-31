class AnimationManager {
	constructor(ds) {
		this.ds = ds;
		this.at = [];
	}

	add(delayPerFrame, sequences) {
		for (let i = 0; i < sequences.length; i++) {
			const delay = Number.isInteger(delayPerFrame) ? delayPerFrame : delayPerFrame[i];
			this.at.push(new AnimationThread(delay, sequences[i]));
		}
	}

	remove(id) {
		this.at.splice(id, 1);
	}

	draw(id, x, y) {
		const at = this.at[id];
		c.drawImage(this.ds.img, this.ds.coordinates[at.i].x, this.ds.coordinates[at.i].y, SIZE, SIZE,
			x, y, SIZE, SIZE);
		at.update();
	}
}