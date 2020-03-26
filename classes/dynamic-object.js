class DynamicObject {
	constructor(x, y, width, height, dir, instruction, delayPerFrame, sequences) {
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.head = this.height / 2;

		this.velocity = { x: 0, y: 0 };

		this.speed = 4;
		this.id = 0;

		this.sprite = new DynamicSprite(dir, delayPerFrame, sequences);
		this.shadowSprite = new StaticSprite('res/shadow/char.png');
		this.control = new Control();
		this.instruction = instruction;
		this.i = 0;

		this.offset = {
			x1: 16,
			x2: 16,
			y1: 3,
			y2: 5
		};
	}

	update() {
		this.updateInstruction();
		this.updateMovement();

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		this.checkCollision();
		this.checkBoundaries();
	}

	draw() {
		this.shadowSprite.draw(this.x, this.y);
		this.sprite.draw(this.id, this.x, this.y);
		this.update();
	}

	updateInstruction() {
		let ins = this.instruction[this.i];
		this.control.reset();

		switch(ins.direction) {
			case 'left': this.control.left = true; break;
			case 'up': this.control.up = true; break;
			case 'right': this.control.right = true; break;
			case 'down': this.control.down = true; break;
		}
		
		if (this.x === ins.x && this.y === ins.y) {
			this.i++;
			this.control.reset();
			if (this.i >= this.instruction.length) this.i = 0;
		}
	}

	updateMovement() {
		if (this.control.left) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;

			this.id = 1;
			this.sprite.play(this.id);
		}
		else if (this.control.up) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;

			this.id = 3;
			this.sprite.play(this.id);
		}
		else if (this.control.right) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;

			this.id = 2;
			this.sprite.play(this.id);
		}
		else if (this.control.down) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;

			this.id = 0;
			this.sprite.play(this.id);
		}

		if (this.control.right === false && this.control.left === false) {
			this.velocity.x = 0;

			this.sprite.stop(1);
			this.sprite.stop(2);
		}

		if (this.control.down  === false && this.control.up === false) {
			this.velocity.y = 0;

			this.sprite.stop(3);
			this.sprite.stop(0);
		}
	}

	checkCollision() {
		objects.data.forEach(obj => {
			if (obj !== this) {
				let x1 = this.x + this.offset.x1;
				let x2 = this.x + this.width - this.offset.x2;
				let y1 = this.y + this.head + this.offset.y1;
				let y2 = this.y + this.height - this.offset.y2

				let ox1 = obj.x + obj.offset.x1;
				let ox2 = obj.x + obj.width - obj.offset.x2;
				let oy1 = obj.y + obj.head + obj.offset.y1;
				let oy2 = obj.y + obj.height - obj.offset.y2;

				if (x1 < ox2 && x2 > ox1 && y1 < oy2 && y2 > oy1) {
					if (this.velocity.x != 0) this.x -= this.velocity.x;
					if (this.velocity.y != 0) this.y -= this.velocity.y;
				}
			}
		});
	}

	checkBoundaries() {
		let x1 = this.x + this.offset.x1;
		let x2 = this.x + this.width - this.offset.x2;
		let y1 = this.y + this.offset.y1;
		let y2 = this.y + this.height - this.offset.y2

		if (x1 < 0) this.x = -this.offset.x1;
		else if (x2 > mapW) this.x = mapW - this.width + this.offset.x2;

		if (y1 < 0) this.y = -this.offset.y1;
		else if (y2 > mapH) this.y = mapH - this.height + this.offset.y2;
	}
}