class StaticEntity extends Entity {
	constructor(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset,
		spriteIDs, message, isChanging=false, isCollidable=true) {
		super(x, y, w, h);

		this.name = name;

		this.mainSprite = mainSprite;
		this.shadowSprite = shadowSprite;
		this.mainOffset = (mainOffset === null || mainOffset === undefined) ?
			{ x1: 0, x2: 0, y1: 0, y2: 0 } : mainOffset;
		this.shadowOffset = (shadowOffset === null || shadowOffset === undefined) ?
			{ x: 0, y: 0 } : shadowOffset;

		this.isCollidable = isCollidable;
		this.isChanging = isChanging;

		if (spriteIDs !== null) {
			this.spriteIDs = spriteIDs;
			this.spriteID = spriteIDs[0];
		}

		this.message = message;
		this.interactingTo = null;

		this.x = this.cx + this.mainOffset.x1;
		this.y = this.cy + this.mainOffset.y1;

		this.l = this.x;
		this.r = this.cx + this.w - this.mainOffset.x2;
		this.t = this.y;
		this.b = this.cy + this.h - this.mainOffset.y2;

		this.ol = this.l;
		this.or = this.r;
		this.ot = this.t;
		this.ob = this.b;
	}
}