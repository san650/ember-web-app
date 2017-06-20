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
      command: 'npm run nodetest',
      npm: {
        devDependencies: {}
      }
    }
  ]
};
