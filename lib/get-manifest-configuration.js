'use strict';

module.exports = function getManifestConfiguration(project, env) {
  try {
    let appConfig = project.config(env);

    return project.require('./config/manifest.js')(env, appConfig);
  } catch(e) {
    return {};
  }
};