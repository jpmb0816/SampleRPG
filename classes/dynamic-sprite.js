class DynamicSprite {
	constructor(dir, sequences, delayPerFrame) {
		this.dir = dir;
		this.img = null;
		this.coordinates = [];

		loadImage(dir, loadedImage => {
			this.img = loadedImage;
			for (let y = 0; y < loadedImage.height; y += SIZE) {
				for (let x = 0; x < loadedImage.width; x += SIZE) {
					this.coordinates.push({ x: x, y: y });
				}
			}
		});
		
		this.am = new AnimationManager(this);
		this.am.add(sequences, delayPerFrame);
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