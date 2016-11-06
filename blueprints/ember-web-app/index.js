/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {},

  locals: function(options) {
    return {
      name: options.project.name()
    };
  }
};
