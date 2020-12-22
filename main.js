// dummy functions just print name and arguments
function drawPoint(point, color) {
    console.log(arguments.callee.name, arguments)
    return { point, color }
}

function drawLine(pointA, pointB, color) {
    console.log(arguments.callee.name, arguments)
    return { pointA, pointB, color }
}

function drawCircle(point, radius, color) {
    console.log(arguments.callee.name, arguments)
    return { point, radius, color }
}

function rotate(line, angle) {
    console.log(arguments.callee.name, arguments)
    return line
}

function _do(args) {
    console.log(arguments.callee.name, arguments)
    return args[args.length - 1]
}

function evaluate(data) {
    const fns = {
        drawPoint,
        drawLine,
        drawCircle,
        rotate,
        do: _do
    }

    const parseInstruction = (ins) => {
        if (!Array.isArray(ins)) {
            return ins
        }

        const [funcName, ...args] = ins

        return fns[funcName](...args.map(parseInstruction))
    }

    parseInstruction(data)
}

const data = [
    'do',
    ['drawPoint', { x: 0, y: 0}, 'blue'],
    ['rotate',
        ['drawLine', { x: 0, y: 0}, { x: 1, y: 1 }, 'yellow'],
        90]
]

evaluate(data)

