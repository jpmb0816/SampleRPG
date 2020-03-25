class StaticResourceManager {
	constructor() {
		this.names = [];
		this.sprites = [];
	}

	add(name, dir) {
		this.names.push(name);
		this.sprites.push(new StaticSprite(dir));
	}

	remove(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		this.sprites.splice(id, 1);
	}

	draw(id, x, y) {
		if (!Number.isInteger(id)) id = this.getId(id);
		this.sprites[id].draw(x, y);
	}

	drawRect(id, x, y, w, h) {
		if (!Number.isInteger(id)) id = this.getId(id);
		let sp = this.sprites[id].img;
		
		for (let dy = y; dy < h; dy += sp.height) {
			for (let dx = x; dx < w; dx += sp.width) {
				this.draw(id, dx, dy);
			}
		}
	}

	getWidth(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		return this.sprites[id].img.width;
	}

	getHeight(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		return this.sprites[id].img.height;
	}

	getId(name) {
		for (let i = 0; i < this.names.length; i++) {
			if (this.names[i] === name) return i;
		}
		return -1;
	}

	getSprite(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		return this.sprites[id];
	}
}