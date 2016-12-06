/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    name: "<%= name %>",
    short_name: "<%= name %>",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
    ]
  };
}
