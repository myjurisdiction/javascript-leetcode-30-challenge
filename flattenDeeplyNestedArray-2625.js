/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */

const sample1 = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
const sample2 = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

var flat = function (arr, n) {
  if (n === 0) return arr;
  const flattenedArr = [];

  function performFlatten(arr, n, depth = 0) {
    for (let item of arr) {
      if (Array.isArray(item) && depth < n) {
        performFlatten(item, n, depth + 1);
      } else if (Array.isArray(item) && depth >= n) {
        flattenedArr.push(item);
      } else {
        flattenedArr.push(item);
      }
    }
  }

  performFlatten(arr, n);
  return flattenedArr;
};

const res = flat(sample2, 2);

console.log(res);
