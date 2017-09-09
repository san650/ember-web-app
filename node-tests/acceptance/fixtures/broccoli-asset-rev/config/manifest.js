/*jshint node:true*/
'use strict';

module.exports = function() {
  return {
    icons: [
      {
        src: 'pio.png'
      },
      {
        src: 'pio.png',
        element: 'square150x150logo',
        targets: ['ms']
      }
    ],

    ms: {
      tileColor: '#FFFFFF'
    }
  };
}
