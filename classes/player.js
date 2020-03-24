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
	}

	update() {
		this.draw();

		this.updateAM();

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		//this.checkCollision();
		this.checkBoundaries();
	}

	draw() {
		am.animate(this.id, this.x, this.y);
	}

	updateAM() {
		if (control.left) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;

			this.id = 1;
			am.ds[this.id].play();
		}
		else if (control.up) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;

			this.id = 3;
			am.ds[this.id].play();
		}
		else if (control.right) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;

			this.id = 2;
			am.ds[this.id].play();
		}
		else if (control.down) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;

			this.id = 0;
			am.ds[this.id].play();
		}

		if (control.right === false && control.left === false) {
			this.velocity.x = 0;

			am.ds[1].stop();
			am.ds[2].stop();
		}
		if (control.down  === false && control.up === false) {
			this.velocity.y = 0;

			am.ds[3].stop();
			am.ds[0].stop();
		}
	}

	// checkCollision() {
	// 	for (let y = 0; y < column; y++) {
	// 		for (let x = 0; x < row; x++) {
	// 			let value = map[y][x];

	// 			if (value == 0) continue;
				
	// 			let obstacle = {
	// 				x: x * tile_size * scale,
	// 				y: y * tile_size * scale,
	// 				width: tile_size * scale,
	// 				height: tile_size * scale
	// 			};

	// 			if (this.x < obstacle.x + obstacle.width && this.x + this.width > obstacle.x) {
	// 				if (this.y + this.head < obstacle.y + obstacle.height && this.y + this.head + this.height / 2 > obstacle.y) {
	// 					if (this.velocity.x != 0) {
	// 						this.x -= this.velocity.x;
	// 					}

	// 					if (this.velocity.y != 0) {
	// 						this.y -= this.velocity.y;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

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