class Player {
	constructor(x, y, width, height) {
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
	}

	update() {
		this.updateAM();

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		// this.checkCollision();
		// this.checkBoundaries();
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
		for (let y = 0; y < height / SIZE; y++) {
			for (let x = 0; x < width / SIZE; x++) {
				let value = map[y][x];

				if (value == 0) continue;
				
				let obstacle = {
					x: x * SIZE,
					y: y * SIZE,
					width: SIZE,
					height: SIZE
				};

				if (this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x) {
					if (this.y + this.head < obstacle.y + obstacle.height && this.y + this.head + this.height / 2 > obstacle.y) {
						if (this.velocity.x != 0) {
							this.x -= this.velocity.x;
						}

						if (this.velocity.y != 0) {
							this.y -= this.velocity.y;
						}
					}
				}
			}
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