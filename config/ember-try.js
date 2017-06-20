/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'ember-default',
      npm: {
        devDependencies: {}
      }
    },
    {
      name: 'node-tests',
      command: 'npm run node-test',
      npm: {
        devDependencies: {}
      }
    }
  ]
};
