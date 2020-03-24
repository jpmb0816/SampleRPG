class AnimationManager {
	constructor(rm) {
		this.rm = rm;
		this.ds = [];
	}

	add(sId, eId, timeOutPerFrame) {
		let ds = new DynamicSprite(sId, eId, timeOutPerFrame);
		this.ds.push(ds);
	}

	remove(id) {
		this.ds.splice(id, 1);
	}

	animate(id, x, y) {
		let ds = this.ds[id];
		image(this.rm.img, x, y, SIZE, SIZE, this.rm.coordinates[ds.i].x, this.rm.coordinates[ds.i].y, SIZE, SIZE);
		ds.update();
	}
}