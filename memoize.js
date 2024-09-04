/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const map = new Map();
  return function (...args) {
    const hashValue = hash(...args);
    if (map.has(hashValue)) {
      return map.get(hashValue);
    }

    const result = fn.apply(this, args);
    map.set(hashValue, result);
    return result;
  };
}

function hash(...args) {
  return args.join("-");
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});
const r = memoizedFn(2, 100); // 5
const z = memoizedFn(2, 7); // 5
console.log(callCount, r, z); // 1
