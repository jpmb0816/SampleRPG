class SpriteManager {
	constructor(dir) {
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
	}

	draw(id, x, y) {
		image(this.img, x, y, SIZE, SIZE, this.coordinates[id].x, this.coordinates[id].y, SIZE, SIZE);
	}
}