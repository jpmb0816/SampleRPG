class Player {
	constructor(x, y, width, height, type='default') {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.head = height / 2;

		this.velocity = {
			x: 0,
			y: 0
		};

		this.speed = 4;
		this.id = 0;

		this.sprite = new DynamicSprite('res/char/main.png', 8);

		this.shadowSprite = new StaticSprite('res/shadow/char.png');

		this.offset = {
			x1: 16,
			x2: 16,
			y1: 3,
			y2: 5
		};

		this.type = type;
	}

	update() {
		this.updateAM();

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

	updateAM() {
		if (control.left) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;

			this.id = 1;
			this.sprite.play(this.id);
		}
		else if (control.up) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;

			this.id = 3;
			this.sprite.play(this.id);
		}
		else if (control.right) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;

			this.id = 2;
			this.sprite.play(this.id);
		}
		else if (control.down) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;

			this.id = 0;
			this.sprite.play(this.id);
		}

		if (control.right === false && control.left === false) {
			this.velocity.x = 0;

			this.sprite.stop(1);
			this.sprite.stop(2);
		}
		
		if (control.down  === false && control.up === false) {
			this.velocity.y = 0;

			this.sprite.stop(3);
			this.sprite.stop(0);
		}
	}

	checkCollision() {
		objects.data.forEach(obj => {
			if (obj !== this && obj.type === 'default') {
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