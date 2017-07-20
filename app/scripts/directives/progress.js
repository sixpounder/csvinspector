'use strict';
angular.module('csvinspector').directive('progress', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'views/components/progress.html',
    scope: {
      value: '=',
      visible: '='
    }
  };
});