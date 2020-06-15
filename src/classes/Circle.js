import { yinyang } from "../utils";

export default class Point {
  constructor(ctx, W, H, color) {
    this.config = { ctx, W, H, color };
    this.init();
  }

  init() {
    const { W, H } = this.config;

    this.config.r = (H / 2) * 0.9;
    this.config.x = W / 2;
    this.config.y = H / 2;
    this.config.vx = Math.random() * 120 * yinyang();
    this.config.vy = Math.random() * 120 * yinyang();
    this.config.distance = Math.random() * 24;
  }

  draw(x_, y_) {
    const { x, y, r, ctx, color } = this.config;
    const point = new Path2D();
    point.arc(x_ || x, y_ || y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill(point);
  }

  update() {
    const { x, y, r, W, H } = this.config;
    if (x + r > W || x + r < r * 2) this.config.vx *= -1;
    if (y + r > H || y + r < r * 2) this.config.vy *= -1;

    this.config.x += this.config.vx;
    this.config.y += this.config.vy;
    this.draw();
  }

  change(W, H) {
    this.config.W = W;
    this.config.H = H;
    this.init();
  }
}
