class DynamicResourceManager {
	constructor() {
		this.names = [];
		this.sprites = [];
	}

	add(name, dir, sequences, delayPerFrame) {
		this.names.push(name);
		this.sprites.push(new DynamicSprite(dir, sequences, delayPerFrame));
	}

	remove(id) {
		if (!Number.isInteger(id)) id = this.getId(id);
		this.sprites.splice(id, 1);
	}

	draw(sId, aId, x, y) {
		if (!Number.isInteger(sId)) sId = this.getId(sId);
		this.sprites[sId].draw(aId, x, y);
	}

	play(sId, aId) {
		if (!Number.isInteger(sId)) sId = this.getId(sId);
		this.sprites[sId].play(aId);
	}

	stop(sId, aId) {
		if (!Number.isInteger(sId)) sId = this.getId(sId);
		this.sprites[sId].stop(aId);
	}

	getWidth(sId, aId) {
		if (!Number.isInteger(sId)) sId = this.getId(sId);
		return this.sprites[sId].getWidth(aId);
	}

	getHeight(sId, aId) {
		if (!Number.isInteger(sId)) sId = this.getId(sId);
		return this.sprites[sId].getHeight(aId);
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