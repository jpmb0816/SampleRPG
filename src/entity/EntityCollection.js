class EntityCollection {
	constructor() {
		this.data = [];
		this.order = [];
	}

	sortbyYOrder() {
		const len = this.order.length - 1;

		for (let i = len; i >= 0; i--) {
			const a = this.order[i];

			if (a.redundant && !(a instanceof Player)) {
				this.removeData(a);
				this.removeOrder(i);
				continue;
			}

			if (i > 0) {
				for (let j = 0; j < i; j++) {
					const b = this.order[j];

					if (b.cy < a.cy && b.cy + b.h > a.cy + a.h ||
						b.cy > a.cy && b.cy + b.h > a.cy + a.h) {
						
						const temp = this.order[i];
						this.order[i] = this.order[j];
						this.order[j] = temp;
					}
				}
			}
		}
	}

	drawAll() {
		this.order.forEach(e => e.draw());
	}

	add(object) {
		this.data.push(object);
		this.order.push(object);
	}
	
	addAll(objects) {
		objects.forEach(obj => this.add(obj));
	}

	removeData(d) {
		const data = this.data;
		const len = data.length;

		for (let i = 0; i < len; i++) {
			if (this.data[i] === d) {
				this.data.splice(i, 1);
				return;
			}
		}
	}

	removeOrder(id) {
		this.order.splice(id, 1);
	}
}