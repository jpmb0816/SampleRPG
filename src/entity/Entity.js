class Entity {
	constructor(x, y, w, h) {
		this.cx = x;
		this.cy = y;

		this.x = x;
		this.y = y;

		this.w = w;
		this.h = h;

		this.l = x;
		this.r = x + w;
		this.t = y;
		this.b = y + h;

		this.ol = this.l;
		this.or = this.r;
		this.ot = this.t;
		this.ob = this.b;
	}
}