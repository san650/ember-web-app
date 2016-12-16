'use strict';

module.exports = hasTarget;

function hasTarget(object, target) {
  return object &&
    object.targets &&
    object.targets.indexOf &&
    object.targets.indexOf(target) > -1;
}
