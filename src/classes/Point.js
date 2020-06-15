import { dist, lerp, yinyang } from "../utils";
import { colors as COLORS, types as TYPES } from "../configs";

export default class Point {
  constructor(ctx, W, H, type) {
    this.config = { ctx, W, H, type };

    this.config.type = type;

    switch (type) {
      case TYPES.DEFAULT:
        this.config.color = COLORS.white;
        break;
      case TYPES.SMS:
        this.config.color = COLORS.slateBlue;
        break;
      case TYPES.PHOTO:
        this.config.color = COLORS.lime;
        break;
      case TYPES.CONTACT:
        this.config.color = COLORS.neonCarrot;
        break;
      case TYPES.CALL:
        this.config.color = COLORS.electricIndigo;
        break;
      default:
        break;
    }

    this.config.r = Math.random() * 12;
    this.config.x = W / 2; //+ ((Math.random() * W) / 4) * yinyang();
    this.config.y = H / 2; //+ ((Math.random() * H) / 4) * yinyang();
    this.config.vx = Math.random() * 9.6 * yinyang();
    this.config.vy = Math.random() * 9.6 * yinyang();
    this.config.distance = Math.random() * 24;
  }

  draw(x_, y_) {
    const { x, y, r, ctx, color, isActive } = this.config;
    const point = new Path2D();
    point.arc(x_ || x, y_ || y, r, 0, 2 * Math.PI);
    ctx.fillStyle = isActive ? color : COLORS.white;
    ctx.fill(point);
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.black;
    ctx.stroke(point);
  }

  update() {
    const { x, y, r, W, H } = this.config;
    if (x + r > W || x + r < r * 2) this.config.vx *= -1;
    if (y + r > H || y + r < r * 2) this.config.vy *= -1;

    this.config.x += this.config.vx;
    this.config.y += this.config.vy;
    this.draw();
  }

  bounceInCircle({ x: cx, y: cy, r: cr }, activeType) {
    const { type, x, y } = this.config;

    this.config.isActive = activeType === type;

    if (dist(x, y, cx, cy) > cr) {
      this.config.vx *= -1;
      this.config.vy *= -1;
    }

    this.config.x += lerp(this.config.vx * 0.4, this.config.vx);
    this.config.y += lerp(this.config.vy * 0.4, this.config.vy);
    // this.config.x += this.config.vx;
    // this.config.y += this.config.vy;
    this.draw();
  }

  change(W, H) {
    this.config.W = W;
    this.config.H = H;
    this.config.x = W / 2 + ((Math.random() * W) / 4) * yinyang();
    this.config.y = H / 2 + ((Math.random() * H) / 4) * yinyang();
  }
}
