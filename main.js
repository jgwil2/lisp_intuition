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

const data = [
  "do",
  ["drawCircle", { x: 50, y: 50 }, 30, "blue"],
  [
    "def",
    "drawTriangle",
    [
      "fn",
      ["a", "b", "c", "color"],
      [
        "do",
        ["drawLine", "a", "b", "color"],
        ["drawLine", "b", "c", "color"],
        ["drawLine", "c", "a", "color"],
      ],
    ],
  ],
  [
    "drawTriangle",
    { x: 0, y: 0 },
    { x: 100, y: 100 },
    { x: 100, y: 0 },
    "blue",
  ],
];

const evaluator = new Evaluator({ drawLine, drawCircle });
evaluator.evaluate(data);
console.log(ctx.toString());
