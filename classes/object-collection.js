class ObjectCollection {
	constructor() {
		this.data = [];
	}

	sortbyYOrder() {
		for (let i = this.data.length - 1; i >= 0; i--) {
			for (let j = 0; j < i; j++) {
				if (this.data[j].y > this.data[i].y || this.data[j].y === this.data[i].y && this.data[j] instanceof Player) {
					let temp = this.data[i];
					this.data[i] = this.data[j];
					this.data[j] = temp;
				}
			}
		}
	}

	drawAll() {
		for (let i = 0; i < this.data.length; i++) {
			this.data[i].draw();
		}
	}

	add(object) {
		this.data.push(object);
	}

	remove(id) {
		this.data.splice(id, 1);
	}
}