class DynamicEntity {
	constructor(name, x, y, width, height, charSprite, shadowSprite, instruction, delayPerFrame,
		message, shadowOffset, sequences, type='default') {

		this.id = null;
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.head = this.height / 2;
		this.velocity = { x: 0, y: 0 };
		this.speed = 2;

		this.charSprite = new AnimationSprite(charSprite, delayPerFrame, 1, sequences);
		this.shadowSprite = shadowSprite;
		this.control = new Control();
		this.instruction = instruction;

		this.type = type;
		this.spriteID = 0;
		this.i = 0;
		this.offset = {
			x1: 8,
			x2: 8,
			y1: 2,
			y2: 4
		};
		this.shadowOffset = (shadowOffset === undefined) ?
			{ x: 0, y: 5 } : shadowOffset;

		this.name = name;
		this.message = message;
		this.interactingTo = null;
	}

	update() {
		this.updateInstruction();
		this.updateMovement();
		
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		if (this.type === 'default') this.checkCollision();
		this.checkBoundaries();
	}

	draw() {
		if (this.x < camera.x + camera.cw && this.x + this.width > camera.x &&
			this.y < camera.y + camera.ch && this.y + this.height > camera.y) {
			
			this.shadowSprite.draw(this.x + this.shadowOffset.x, this.y + this.shadowOffset.y);
			this.charSprite.draw(this.spriteID, this.x, this.y);
		}
		
		this.update();
	}

	updateInstruction() {
		this.control.reset();

		if (this.interactingTo === null) {
			if (this.instruction !== null) {
				const ins = this.instruction[this.i];
				const posX = gridToCoordinate(ins[1]);
				const posY = gridToCoordinate(ins[2]);

				switch (ins[0]) {
					case 'left': this.control.left = true; break;
					case 'up': this.control.up = true; break;
					case 'right': this.control.right = true; break;
					case 'down': this.control.down = true; break;
				}
				
				if (this.x === posX && this.y === posY) {
					this.i++;
					this.control.reset();
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
		if (this.control.left) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;

			this.spriteID = 1;
			this.charSprite.play(this.spriteID);
		}
		else if (this.control.up) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;

			this.spriteID = 3;
			this.charSprite.play(this.spriteID);
		}
		else if (this.control.right) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;

			this.spriteID = 2;
			this.charSprite.play(this.spriteID);
		}
		else if (this.control.down) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;

			this.spriteID = 0;
			this.charSprite.play(this.spriteID);
		}

		if (this.control.right === false && this.control.left === false) {
			this.velocity.x = 0;

			this.charSprite.stop(1);
			this.charSprite.stop(2);
		}

		if (this.control.down  === false && this.control.up === false) {
			this.velocity.y = 0;

			this.charSprite.stop(3);
			this.charSprite.stop(0);
		}
	}

	checkCollision() {
		objects.data.forEach(obj => {
			if (obj !== this && obj.type === 'default') {
				const x1 = this.x + this.offset.x1;
				const x2 = this.x + this.width - this.offset.x2;
				const y1 = this.y + this.head + this.offset.y1;
				const y2 = this.y + this.height - this.offset.y2

				const ox1 = obj.x + obj.offset.x1;
				const ox2 = obj.x + obj.width - obj.offset.x2;
				const oy1 = obj.y + obj.head + obj.offset.y1;
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
}