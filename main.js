const globalVars = {};
// dummy functions just print name and arguments
function drawPoint(point, color) {
  console.log(arguments.callee.name, arguments);
  return { point, color };
}

function drawLine(pointA, pointB, color) {
  console.log(arguments.callee.name, arguments);
  return { pointA, pointB, color };
}

function drawCircle(point, radius, color) {
  console.log(arguments.callee.name, arguments);
  return { point, radius, color };
}

function rotate(line, angle) {
  console.log(arguments.callee.name, arguments);
  return line;
}

function def(name, val) {
  console.log(arguments.callee.name, arguments);
  globalVars[name] = val;
  // TODO should def return val
}

function _do() {
  return arguments[arguments.length - 1];
}

function evaluate(data) {
  const fns = {
    drawPoint,
    drawLine,
    drawCircle,
    rotate,
    do: _do,
    def,
  };

  const zipObject = (props, values) => {
    return props.reduce((acc, val, key) => {
      acc[val] = values[key];
      return acc;
    }, {});
  };

  const parseFnInstruction = (args, body, parentScope) => {
    // create a new js function taking args and executing body
    return (...values) => {
      // values is name of args to new function
      const funcScope = {
        ...parentScope,
        ...zipObject(args, values),
      };
      return parseInstruction(body, funcScope);
    };
  };

  const parseInstruction = (ins, currentScope) => {
    // instruction is a variable in current scope
    if (currentScope[ins]) {
      return currentScope[ins];
    }

    if (!Array.isArray(ins)) {
      return ins;
    }

    const [funcName, ...args] = ins;

    if (funcName === "fn") {
      return parseFnInstruction(...args, currentScope);
    }

    const fn = fns[funcName] || currentScope[funcName];

    return fn(...args.map((arg) => parseInstruction(arg, currentScope)));
  };

  parseInstruction(data, globalVars);
}

const data = [
  "do",
  ["drawPoint", { x: 0, y: 0 }, "blue"],
  ["def", "myShape", ["drawLine", { x: 0, y: 0 }, { x: 1, y: 1 }, "yellow"]],
  ["rotate", "myShape", 90],
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
  ["drawTriangle", { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, "blue"],
];

evaluate(data);
