'use strict';

module.exports = includes;

// Polyfill for Array.prototype.includes for Node.js < 6
function includes(array, element) {
  if (!array) {
    return false;
  }

  const length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] === element) {
      return true;
    }
  }

  return false;
}
