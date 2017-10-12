module.exports = fuzzyPurgeRequireEntry;

// taken from https://github.com/ember-cli/broccoli-config-loader
function fuzzyPurgeRequireEntry(entry) {
  return Object.keys(require.cache).filter(function(path) {
    return path.indexOf(entry) > -1;
  }).forEach(function(entry) {
    delete require.cache[entry];
  });
}
