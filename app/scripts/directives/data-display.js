'use strict';
angular.module('csvinspector').directive('display', function() {
  return {
    restrict: 'AE',
    replace: false,
    templateUrl: 'views/components/data-viewer.html',
    scope: {
      data: '=ngModel'
    },
    controller: function($scope, lodash) {
      var _ = $scope._ = lodash._;
      $scope.showAll = true;

      $scope.$watch('filterText', function(newValue, oldValue) {
        if(newValue !== null && newValue !== undefined && newValue !== oldValue) {
          if(newValue !== '') {
            $scope.showAll = false;
            var propFilter = null;
            var valFilter = newValue;

            // See if we are looking for a particular property (ex: prop::value search text)
            if(newValue.indexOf('::') !== -1) {
              propFilter = newValue.split('::')[0];
              valFilter = newValue.split('::')[1];
            } else {
              valFilter = newValue;
            }

            _.forEach($scope.data, function(item) {
              if(propFilter !== null) {
                // We are looking for a specific property (easy!)
                if(item[propFilter].toLowerCase().indexOf(valFilter.toLowerCase()) !== -1) {
                  item.dataViewerHidden = false;
                } else {
                  item.dataViewerHidden = true;
                }
              } else {
                /**
                *
                *
                *  SEARCH ALL THE PROPERTIES!!!!!
                *
                *
                *
                * ─────────────────────────────▄██▄
                * ─────────────────────────────▀███
                * ────────────────────────────────█
                * ───────────────▄▄▄▄▄────────────█
                * ──────────────▀▄────▀▄──────────█
                * ──────────▄▀▀▀▄─█▄▄▄▄█▄▄─▄▀▀▀▄──█
                * ─────────█──▄──█────────█───▄─█─█
                * ─────────▀▄───▄▀────────▀▄───▄▀─█
                * ──────────█▀▀▀────────────▀▀▀─█─█
                * ──────────█───────────────────█─█
                * ▄▀▄▄▀▄────█──▄█▀█▀█▀█▀█▀█▄────█─█
                * █▒▒▒▒█────█──█████████████▄───█─█
                * █▒▒▒▒█────█──██████████████▄──█─█
                * █▒▒▒▒█────█───██████████████▄─█─█
                * █▒▒▒▒█────█────██████████████─█─█
                * █▒▒▒▒█────█───██████████████▀─█─█
                * █▒▒▒▒█───██───██████████████──█─█
                * ▀████▀──██▀█──█████████████▀──█▄█
                * ──██───██──▀█──█▄█▄█▄█▄█▄█▀──▄█▀
                * ──██──██────▀█─────────────▄▀▓█
                * ──██─██──────▀█▀▄▄▄▄▄▄▄▄▄▀▀▓▓▓█
                * ──████────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
                * ──███─────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
                * ──██──────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
                * ──██──────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
                * ──██─────────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
                * ──██────────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
                * ──██───────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌
                * ──██──────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌
                * ──██─────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌
                * ──██────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌
                */
                _.forEach(_.values(item), function(v) {
                  var examine = v;
                  
                  if(_.isObject(examine)) {
                    examine = JSON.stringify(v);
                  }

                  if(!_.isString(examine)) {
                    examine = examine.toString();
                  }

                  if(examine.toLowerCase().indexOf(valFilter.toLowerCase()) !== -1) {
                    item.dataViewerHidden = false;
                    return false; // Breaks forEach on this item values
                  } else {
                    item.dataViewerHidden = true;
                  }
                  
                });
              }
              
            });
          } else {
            $scope.showAll = true;
          }
        }
        
      });
    }
  };
});