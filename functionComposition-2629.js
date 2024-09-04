/**
 * Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The function composition of an empty list of functions is the identity function f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.
 */

const functions = [(x) => x + 1, (x) => x * x, (x) => 2 * x];

/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    if (!functions.length) return x;
    while (functions.length) {
      const func = functions.pop();
      x = func(x);
    }

    return x;
  };
};

const fn = compose([(x) => x + 1, (x) => 2 * x]);
const result = fn(4);
console.log(result);
