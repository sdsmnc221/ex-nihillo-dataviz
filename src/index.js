import "./styles.css";

import Circle from "./classes/Circle";
import Point from "./classes/Point";

import { dimensions, randomIntegerInRange } from "./utils";
import { colors, eventTypes, types, MAX_PARTICLES } from "./configs";

window.DEFAULT_INFO = {
  count: randomIntegerInRange(2400, 3200),
  type: types.DEFAULT
};

// window.REACT_NATIVE_INFO = {
//   count: 480,
//   activeType: null,
//   data: [
//     { label: 'sms', count: 2479 },
//     { label: 'photos', count: 1355 },
//     { label: 'contacts', count: 45 },
//     { label: 'appels', count: 350 }
//   ]
// };

const { w, h } = dimensions();

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let W = w,
  H = h,
  req,
  circle,
  points = [];

canvas.width = W;
canvas.height = H;

start();
animate();

// setTimeout(() => {
//   window.REACT_NATIVE_INFO = {
//     count: 480,
//     activeType: null,
//     data: [
//       { label: "sms", count: 120 },
//       { label: "photos", count: 120 },
//       { label: "contacts", count: 120 },
//       { label: "appels", count: 120 }
//     ]
//   };
//   window.dispatchEvent(new Event(eventTypes.REACT_NATIVE_INFO));
// }, 3000);

// setTimeout(() => {
//   window.REACT_NATIVE_INFO.activeType = "sms";
//   window.dispatchEvent(new Event(eventTypes.SET_ACTIVE_TYPE));
// }, 6000);

window.addEventListener("resize", () => {
  reset();
});

window.addEventListener(
  eventTypes.REACT_NATIVE_INFO,
  () => {
    clear();
    start();
  },
  false
);

window.addEventListener(
  eventTypes.SET_ACTIVE_TYPE,
  () => {
    console.log(window.REACT_NATIVE_INFO);
  },
  false
);

function start() {
  const { DEFAULT_INFO, REACT_NATIVE_INFO } = window;

  circle = new Circle(ctx, W, H, colors.black);

  if (REACT_NATIVE_INFO) {
    const { count: totalCount } = REACT_NATIVE_INFO;
    const limitReached = totalCount > MAX_PARTICLES;

    REACT_NATIVE_INFO.data.forEach(category => {
      const count = limitReached
        ? (category.count / totalCount) * MAX_PARTICLES
        : count;

      for (let i = 0; i < count; i++) {
        points.push(new Point(ctx, W, H, category.label));
      }
    });
  } else {
    for (let i = 0; i < DEFAULT_INFO.count; i++) {
      points.push(new Point(ctx, W, H, DEFAULT_INFO.type));
    }
  }
}

function animate() {
  req = window.requestAnimationFrame(animate);

  ctx.globalAlpha = 1;
  ctx.resetTransform();
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, W, H);

  //   circle.update();
  circle.draw();
  points.forEach(p =>
    p.bounceInCircle(
      circle.config,
      window.REACT_NATIVE_INFO && window.REACT_NATIVE_INFO.activeType
    )
  );
}

function clear() {
  points = [];
}

function reset() {
  const { w, h } = dimensions();

  W = w;
  H = h;

  canvas.width = W;
  canvas.height = H;

  circle = new Circle(ctx, W, H, colors.black);
  points.forEach(p => p.change(W, H));
}
