const closestNumber = (n, m) => {
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
};

const diff = (num1, num2) => {
  if (num1 > num2) {
    return num1 - num2;
  } else {
    return num2 - num1;
  }
};

const dimensions = () => ({
  W: window.innerWidth,
  H: window.innerHeight,
  w: closestNumber(window.innerWidth - 80, 40),
  h: closestNumber(window.innerHeight - 80, 40)
});

const dist = (x1, y1, x2, y2) => {
  var deltaX = diff(x1, x2);
  var deltaY = diff(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return dist;
};

const lerp = (start, end, amt = 0.5) => (1 - amt) * start + amt * end;

const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const sample = array => array[Math.floor(Math.random() * array.length)];

const yinyang = (odd = 0.5) => (Math.random() < odd ? -1 : 1);

export {
  closestNumber,
  diff,
  dimensions,
  dist,
  lerp,
  randomIntegerInRange,
  sample,
  yinyang
};
