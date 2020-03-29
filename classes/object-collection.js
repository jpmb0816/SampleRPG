class ObjectCollection {
	constructor() {
		this.data = [];
		this.currID = 0;
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
		this.data.forEach(d => d.draw());
	}

	add(object) {
		object.id = this.currID;
		this.data.push(object);
		this.currID++;
	}
	
	addAll(objects) {
		objects.forEach(obj => this.add(obj));
	}

	remove(id) {
		this.data.splice(id, 1);
	}
}