class Evaluator {
  globalVars = {};
  constructor(globalVars) {
    this.globalVars = globalVars;
  }
  evaluate(data) {
    const def = (name, val) => {
      this.globalVars[name] = val;
      // TODO should def return val?
    };

    const _do = () => {
      return arguments[arguments.length - 1];
    };
    const fns = {
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

    parseInstruction(data, this.globalVars);
  }
}

module.exports = Evaluator;
