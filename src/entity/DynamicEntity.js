class DynamicEntity {
	constructor(name, x, y, width, height, charSprite, shadowSprite, offset, shadowOffset,
		instruction, delayPerFrame, sequences, message, type='default') {

		this.id = null;
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.velocity = { x: 0, y: 0 };
		this.speed = 2;

		this.charSprite = new AnimationSprite(charSprite, delayPerFrame, sequences, 1);
		this.shadowSprite = shadowSprite;
		this.move = {
			left: false,
			up: false,
			right: false,
			down: false
		};
		this.instruction = instruction;

		this.type = type;
		this.spriteID = 0;
		this.i = 0;
		
		this.offset = (offset === null) ? { x1: 0, x2: 0, y1: 0, y2: 0 } : offset;
		this.shadowOffset = (shadowOffset === null) ? { x: 0, y: 0 } : shadowOffset;

		this.enable = true;
		this.facing = 'down';
		this.name = name;
		this.message = message;
		this.interactingTo = null;
	}

	update() {
		if (this.enable) {
			this.updateMovement();

			this.x += this.velocity.x;
			this.y += this.velocity.y;

			if (this.velocity.x < 0) {
				this.spriteID = 1;
				this.charSprite.play(1);
				this.facing = 'left';
			}
			else if (this.velocity.x > 0) {
				this.spriteID = 2;
				this.charSprite.play(2);
				this.facing = 'right';
			}
			else {
				this.charSprite.stop(1);
				this.charSprite.stop(2);
			}

			if (this.velocity.y < 0) {
				this.spriteID = 3;
				this.charSprite.play(3);
				this.facing = 'up';
			}
			else if (this.velocity.y > 0) {
				this.spriteID = 0;
				this.charSprite.play(0);
				this.facing = 'down';
			}
			else {
				this.charSprite.stop(3);
				this.charSprite.stop(0);
			}
		}
		else {
			this.velocity.x = 0;
			this.velocity.y = 0;

			this.charSprite.stop(1);
			this.charSprite.stop(2);

			this.charSprite.stop(3);
			this.charSprite.stop(0);
		}

		this.updateInstruction();
		if (this.type === 'default') this.checkCollision();
		this.checkBoundaries();
	}

	draw() {
		if (this.x < camera.x + camera.cw && this.x + this.width > camera.x &&
			this.y < camera.y + camera.ch && this.y + this.height > camera.y) {
			
			this.shadowSprite.draw(c, this.x + this.shadowOffset.x, this.y + this.shadowOffset.y);
			this.charSprite.draw(this.spriteID, this.x, this.y);
		}
		
		this.update();
	}

	updateInstruction() {
		this.resetMove();

		if (this.interactingTo === null) {
			if (this.instruction !== null) {
				const ins = this.instruction[this.i];
				const posX = gridToCoordinate(ins[1]);
				const posY = gridToCoordinate(ins[2]);

				switch (ins[0]) {
					case 'left': this.move.left = true; break;
					case 'up': this.move.up = true; break;
					case 'right': this.move.right = true; break;
					case 'down': this.move.down = true; break;
				}
				
				if (this.x === posX && this.y === posY) {
					this.i++;
					this.resetMove();
					if (this.i >= this.instruction.length) this.i = 0;
				}
			}
			else this.spriteID = 0;
		}
		else {
			switch (this.interactingTo.facing) {
				case 'left': this.spriteID = 2; break;
				case 'up': this.spriteID = 0; break;
				case 'right': this.spriteID = 1; break;
				case 'down': this.spriteID = 3; break;
			}
		}
	}

	updateMovement() {
		if (this.move.left) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;
		}
		else if (this.move.up) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;
		}
		else if (this.move.right) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;
		}
		else if (this.move.down) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;
		}

		if (this.move.right === false && this.move.left === false) this.velocity.x = 0;
		if (this.move.down  === false && this.move.up === false) this.velocity.y = 0;
	}

	checkCollision() {
		objects.data.forEach(obj => {
			if (obj !== this && obj.type === 'default') {
				const x1 = this.x + this.offset.x1;
				const x2 = this.x + this.width - this.offset.x2;
				const y1 = this.y + this.offset.y1;
				const y2 = this.y + this.height - this.offset.y2

				const ox1 = obj.x + obj.offset.x1;
				const ox2 = obj.x + obj.width - obj.offset.x2;
				const oy1 = obj.y + obj.offset.y1;
				const oy2 = obj.y + obj.height - obj.offset.y2;

				if (x1 < ox2 && x2 > ox1 && y1 < oy2 && y2 > oy1) {
					if (this.velocity.x != 0) this.x -= this.velocity.x;
					if (this.velocity.y != 0) this.y -= this.velocity.y;
				}
			}
		});
	}

	checkBoundaries() {
		const x1 = this.x;
		const x2 = this.x + this.width;
		const y1 = this.y;
		const y2 = this.y + this.height;

		if (x1 < 0) this.x = 0;
		else if (x2 > mapW) this.x = mapW - this.width;

		if (y1 < 0) this.y = 0;
		else if (y2 > mapH) this.y = mapH - this.height;
	}

	resetMove() {
		this.move.left = false;
		this.move.up = false;
		this.move.right = false;
		this.move.down = false;
	}
}