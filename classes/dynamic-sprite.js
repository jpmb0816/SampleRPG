class DynamicSprite {
	constructor(img, delayPerFrame, sequences) {
		this.img = img;
		this.coordinates = [];
		this.am = new AnimationManager(this);

		let seq;
		if (sequences === undefined) seq = [];

		for (let y = 0, i = 0; y < this.img.height; y += SIZE) {
			if (sequences === undefined) seq.push([]);

			for (let x = 0; x < this.img.width; x += SIZE, i++) {
				if (sequences === undefined) seq[y / SIZE].push(i);
				this.coordinates.push({ x: x, y: y });
			}
		}
		
		this.am.add(delayPerFrame, (sequences === undefined) ? seq : sequences);
	}

	draw(id, x, y) {
		this.am.draw(id, x, y);
	}

	play(id) {
		this.am.at[id].play();
	}

	stop(id) {
		this.am.at[id].stop();
	}

	getWidth(id) {
		return this.img.width;
	}

	getHeight(id) {
		return this.img.height;
	}
}