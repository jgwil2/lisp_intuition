const process = require("process");
const fs = require("fs");

const Canvas = require("drawille-canvas");
const Evaluator = require("./src/evaluator");

const canvas = new Canvas();
const ctx = canvas.getContext("2d");

function drawLine(start, end, color) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.color = color;
  ctx.stroke();
}

function drawCircle(center, radius, color) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function main() {
  const evaluator = new Evaluator({ drawLine, drawCircle });
  process.argv.slice(2).forEach((val) => {
    fs.readFile(val, "utf-8", (err, data) => {
      if (err) throw err;
      evaluator.evaluate(JSON.parse(data));
      console.log(ctx.toString());
    });
  });
}

main();
