class EntityCollection {
	constructor() {
		this.data = [];
		this.order = [];
		this.currID = 0;
	}

	sortbyYOrder() {
		for (let i = this.order.length - 1; i > 0; i--) {
			const a = this.data[this.order[i]];


			for (let j = 0; j < i; j++) {
				const b = this.data[this.order[j]];

				if (b.cy < a.cy && b.cy + b.h > a.cy + a.h ||
					b.cy > a.cy && b.cy + b.h > a.cy + a.h) {
					
					let temp = this.order[i];
					this.order[i] = this.order[j];
					this.order[j] = temp;
				}
			}
		}

		return this.order;
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