/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  return new Promise((resolve, reject) => {
    if (functions.length === 0) {
      resolve(functions);
    } else {
      const result = [];
      let count = 0;
      for (let i = 0; i < functions.length; i++) {
        functions[i]()
          .then((val) => {
            result[i] = val;
            ++count;
            if (count === functions.length) {
              resolve(result);
            }
          })
          .catch((e) => reject(e));
      }
    }
  });
};

const functions1 = [
  () => new Promise((resolve) => setTimeout(() => resolve(4), 2000)),
  () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
  () => new Promise((resolve, reject) => setTimeout(() => reject('Error'), 5000)),
];

const functions2 =
[() => new Promise(resolve => setTimeout(() => resolve(1), 200)), () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))]

promiseAll(functions1).then(console.log).catch(console.error);

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
