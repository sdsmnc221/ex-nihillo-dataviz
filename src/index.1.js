import "./styles.css";

const utils = {
  lerp: (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  },
  closestNumber: (n, m) => {
    const q = Math.floor(n / m);
    const n1 = m * q;
    let n2;

    if (n * m > 0) {
      n2 = m * (q + 1);
    } else {
      n2 = m * (q - 1);
    }

    if (Math.abs(m - n1) < Math.abs(m - n2)) {
      return n1;
    } else {
      return n2;
    }
  },
  randomize: array => array[Math.floor(Math.random() * array.length)]
};

const config = {
  board: {
    dimensions: {
      x: () => utils.closestNumber(window.innerWidth - 80, 40),
      y: () => utils.closestNumber(window.innerHeight - 80, 40)
    }
  },
  colors: [
    "#F9FAFA",
    "#CFD2D2",
    "#B4B8B8",
    "#DBDBD9",
    "#C6C5C3",
    "#A6A5A3",
    "#888784"
  ]
};

class Point {
  constructor(ctx, W, H, color) {
    this.config = { ctx, W, H, color };
    this.config.r = Math.random() * 6;
    this.config.x = W / 2 - this.config.r * 2;
    this.config.y = H / 2 - this.config.r * 2;
    this.config.vx = Math.random() * 2.4 * (Math.random() < 0.5 ? -1 : 1);
    this.config.vy = Math.random() * 2.4 * (Math.random() < 0.5 ? -1 : 1);
    this.config.distance = Math.random() * 24;
  }

  draw(x_, y_) {
    const { x, y, r, ctx, color, type } = this.config;
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
  }
}

function start() {
  for (let i = 0; i < 240; i++) {
    points.push(
      new Point(ctx, W, H, colors[Math.floor(Math.random() * colors.length)]),
      new Point(ctx, W, H, colors[Math.floor(Math.random() * colors.length)]),
      new Point(ctx, W, H, colors[Math.floor(Math.random() * colors.length)]),
      new Point(ctx, W, H, colors[Math.floor(Math.random() * colors.length)])
    );
  }
}

function animate() {
  req = window.requestAnimationFrame(animate);

  ctx.globalAlpha = 1;
  ctx.resetTransform();
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "#DBDBD9";
  ctx.fillRect(0, 0, W, H);

  points.forEach(p => p.update());

  nbFrames++;
}

function stop() {
  window.cancelAnimationFrame(req);
  req = undefined;
}

function reset(soft = true) {
  W = config.board.dimensions.x();
  H = config.board.dimensions.y();

  canvas.width = W;
  canvas.height = H;

  if (soft) {
    points.forEach(p => p.change(W, H));
  } else {
    points = [];
    nbFrames = 0;
    start();
  }
}

let W = config.board.dimensions.x();
let H = config.board.dimensions.y();

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
canvas.width = W;
canvas.height = H;

const colors = config.colors.filter(c => c !== "#DBDBD9");

let req;

let nbFrames = 0,
  startFrame = 240;

let mouse = { x: W / 2, y: H / 2, r: 40 };
let x = mouse.x;
let y = mouse.y;
let r = mouse.r;

let points = [];

start();
animate();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "r":
      reset(false);
      animate();
      break;
    default:
      if (req) {
        stop();
      } else {
        animate();
      }
      break;
  }
});

window.addEventListener("mousemove", ({ pageX, pageY }) => {
  mouse.x = pageX;
  mouse.y = pageY;
});

let timer;
const whileHold = () => {
  mouse.r = mouse.r + 20;
};

window.addEventListener("mousedown", () => {
  timer = setInterval(whileHold, 200);
});

window.addEventListener("mouseup", () => {
  mouse.r = 40;
  if (timer) clearInterval(timer);
});

window.addEventListener("resize", () => {
  reset();
  animate();
});
