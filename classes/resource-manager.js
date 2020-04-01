class ResourceManager {
	constructor() {
		this.names = [];
		this.sprites = [];
	}

	add(name, img) {
		this.names.push(name);
		this.sprites.push(new SingleSprite(img));
	}

	addMultiSprite(name, img) {
		this.names.push(name);
		this.sprites.push(new MultiSprite(img));
	}

	remove(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		this.sprites.splice(id, 1);
	}

	draw(id, x, y, ctx) {
		if (ctx === undefined) ctx = c;
		if (!Number.isInteger(id)) id = this.getId(id);
		this.sprites[id].draw(x, y, ctx);
	}

	drawMultiSprite(src, id, x, y, ctx) {
		if (ctx === undefined) ctx = c;
		if (!Number.isInteger(src)) src = this.getId(src);
		this.sprites[src].draw(id, x, y, ctx);
	}

	drawRect(id, x, y, w, h, ctx) {
		if (ctx === undefined) ctx = c;
		if (!Number.isInteger(id)) id = this.getId(id);
		let sp = this.sprites[id].img;
		
		for (let dy = y; dy < h; dy += sp.height) {
			for (let dx = x; dx < w; dx += sp.width) {
				this.draw(id, dx, dy, ctx);
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
	
	getImage(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		return this.sprites[id].img;
	}
}