var Canvas = require("drawille-canvas");

const canvas = new Canvas();
const ctx = canvas.getContext("2d");

const flush = function () {
  console.log(ctx.toString());
};

function draw() {
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  // Set line width
  ctx.lineWidth = 2;

  // Wall
  ctx.strokeRect(15, 28, 38, 22);

  // Door
  ctx.fillRect(30, 38, 8, 12);

  // Roof
  ctx.beginPath();
  ctx.moveTo(14, 28);
  ctx.lineTo(34, 12);
  ctx.lineTo(54, 28);
  ctx.closePath();
  ctx.stroke();

  flush();
}

draw();
