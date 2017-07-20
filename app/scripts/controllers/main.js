'use strict';

/**
 * @ngdoc function
 * @name csvinspector.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the csvinspector
 */
angular.module('csvinspector')
  .controller('MainCtrl', function ($scope, parser, fileReader, $timeout, $log) {
    
    var parseProperties = function parseProperties(data) {
      return parser.parse(data, $scope, function(e, r) {
        $scope.$apply(function() {
          if(e) {
            $log.error(e);
            $scope.error = e;
            $scope.resetFile();
          } else {
            $scope.data = r.object;
            $scope.skippedItems = r.skipped;
          }
          $scope.parsing = false;
          $scope.loading = false;
        });
      });
    };

    $scope.data = null;
    $scope.parsing = false;
    $scope.loading = false;
    $scope.filterText = '';
    $scope.skippedItems = 0;
    $scope.error = null;

    $scope.separator = ';';
    $scope.availableSeparators = [ ';', ',', '|', '-' ];
    $scope.setSeparator = function(s) {
      $scope.separator = s;
    };

    $scope.$on('fileProgress', function(e, progress) {
      $scope.progress = (progress.loaded / progress.total) * 100;
      if($scope.progress === 100) {
        $scope.loading = false;
      }
    });

    $scope.$on('parseProgress', function(e, progress) {
      $scope.parseProgress = (progress.loaded / progress.total) * 100;
      
      if($scope.parseProgress === 100) {
        $scope.parsing = false;
      }
    });

    $scope.getFile = function () {
      $scope.progress = 0;
      $scope.loading = true;
      $scope.skippedItems = 0;
      $scope.error = null;
      fileReader.readAsText($scope.file, $scope).then(function(result) {
        $scope.parsing = true;
        
        parseProperties(result);
        
      });
    };

    $scope.resetFile = function() {
      angular.element('input[type=file]').val(null);
    };

    $scope.reset = function() {
      $scope.resetFile();
      $scope.data = null;
    };
  }).directive('ngFileSelect', function() {

  return {
    link: function($scope,el){
      
      el.bind('change', function(e) {
        $scope.file = (e.srcElement || e.target).files.length !== 0 ? (e.srcElement || e.target).files[0] : null;
        if($scope.file !== null) {
          $scope.getFile();
        }
      });
    }
  };
});
