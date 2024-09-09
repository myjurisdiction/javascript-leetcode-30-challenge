// This is a JavaScript coding problem from BFE.dev

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */

const l = console.log;

function curry(fn) {
  return function curried(...args) {
    // check if args provided to the curried function matches the arguments provided to the original fn. Also, check if the arguments do not contain any placeholders.
    if (
      args.length >= fn.length &&
      !args.slice(0, fn.length).includes(curry.placeholder)
    ) {
      return fn.apply(this, args);
    }
    return function (...missingArgs) {
        // replace the place holders with the missingArgs and then merge the args with missin args.
      const mergedArgs = args
        .map((arg) =>
          arg === curry.placeholder && missingArgs.length
            ? missingArgs.shift()
            : arg
        )
        .concat(missingArgs);
      return curried.apply(this, mergedArgs);
    };
  };
}

curry.placeholder = Symbol();

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);
const _ = curry.placeholder;
l(curriedJoin(1, 2, 3)); // '1_2_3'
l(curriedJoin(_, 2)(1, 3)); // '1_2_3'
l(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
