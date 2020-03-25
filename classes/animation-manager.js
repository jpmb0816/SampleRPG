class AnimationManager {
	constructor(ds) {
		this.ds = ds;
		this.at = [];
	}

	add(sequences, delayPerFrame) {
		for (let i = 0; i < sequences.length; i++) {
			this.at.push(new AnimationThread(sequences[i], delayPerFrame[i]));
		}
	}

	remove(id) {
		this.at.splice(id, 1);
	}

	draw(id, x, y) {
		let at = this.at[id];
		image(this.ds.img, x, y, SIZE, SIZE, this.ds.coordinates[at.i].x, this.ds.coordinates[at.i].y, SIZE, SIZE);
		at.update();
	}
}