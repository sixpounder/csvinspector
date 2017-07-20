'use strict';
angular.module('csvinspector').factory('$workify', function($window) {
  return function createWorkerFromFunction(worker) {
    var code = worker.toString();
    code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
    var blob = new Blob([code], { type: 'application/javascript' });
    var w = new Worker($window.URL.createObjectURL(blob));

    return w;
  };
});