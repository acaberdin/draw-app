const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeSpan = document.getElementById('size');
const colorInput = document.getElementById('color');
const clearBtn = document.getElementById('clear');
const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = 'black';
let x;
let y;

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mousemove', mouseMove);

canvas.addEventListener('mouseleave', (e) => {
  // draw the last line
  mouseMove(e);
  // release the mouse
  // we don't want to draw a line from the point of leaving.
  mouseUp();
});

canvas.addEventListener('mouseenter', (e) => {
  // verifies if the mouse button is clicked when entering the canvas.
  if (e.buttons == 1) {
    mouseDown(e);
  }
});

function mouseDown(e) {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  drawCircle(x, y);
}

function mouseUp() {
  isPressed = false;
  x = undefined;
  y = undefined;
}

function mouseMove(e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size*2;
  ctx.stroke();
}

increaseBtn.addEventListener('click', () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

function updateSizeOnScreen() {
  sizeSpan.innerText = size;
}

colorInput.addEventListener('input', (e) => (color = e.target.value));

clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));