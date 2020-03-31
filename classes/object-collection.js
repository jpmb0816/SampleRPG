class ObjectCollection {
	constructor() {
		this.data = [];
		this.order = [];
		this.currID = 0;
	}

	sortbyYOrder() {
		for (let i = this.order.length - 1; i >= 0; i--) {
			for (let j = 0; j < i; j++) {
				if (this.data[this.order[j]].y > this.data[this.order[i]].y ||
					this.data[this.order[j]].y === this.data[this.order[i]].y &&
					this.data[this.order[j]] instanceof Player) {
					
					let temp = this.order[i];
					this.order[i] = this.order[j];
					this.order[j] = temp;
				}
			}
		}
	}

	drawAll() {
		this.order.forEach(o => this.data[o].draw());
	}

	add(object) {
		object.id = this.currID;
		this.data.push(object);
		this.order.push(this.currID);
		this.currID++;
	}
	
	addAll(objects) {
		objects.forEach(obj => this.add(obj));
	}

	remove(id) {
		this.data.splice(id, 1);
	}
}