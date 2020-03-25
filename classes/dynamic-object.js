class DynamicObject {
	constructor(x, y, width, height, dir, instruction, delayPerFrame, sequences) {
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.velocity = { x: 0, y: 0 };

		this.speed = 4;
		this.id = 0;

		this.sprite = new DynamicSprite(dir, delayPerFrame, sequences);
		this.shadowSprite = new StaticSprite('res/shadow/char.png');
		this.control = new Control();
		this.instruction = instruction;
		this.i = 0;
	}

	update() {
		this.updateInstruction();
		this.updateMovement();

		this.x += this.velocity.x;
		this.y += this.velocity.y;

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

	checkBoundaries() {
		if (this.x < 0) {
			this.x = 0;
		}
		else if (this.x + this.width > width) {
			this.x = width - this.width;
		}

		if (this.y < 0) {
			this.y = 0;
		}
		else if (this.y + this.height > height) {
			this.y = height - this.height;
		}
	}
}