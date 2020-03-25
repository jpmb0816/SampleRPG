class StaticSprite {
	constructor(dir) {
		this.dir = dir;
		this.img = null;
		loadImage(dir, loadedImage => this.img = loadedImage);
	}

	draw(x, y) {
		image(this.img, x, y);
	}
}