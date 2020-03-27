class StaticSprite {
	constructor(img) {
		this.img = img;
	}

	draw(x, y) {
		c.drawImage(this.img, x, y);
	}
}