'use strict';

(function (module) {
     
  var parser = function (csv, lodash, $log, async, $timeout) {
    
    var parse = function (content, scope, callback) {
      var signal = function(total, loaded) {
        scope.$emit('parseProgress', { total: total, loaded: loaded });
      };

      var skipped = 0;
      var rawObject;
      // var formattedOutput = [];
      var _ = lodash._;
      var Async = async.instance;

      try {
        rawObject = csv.parser.parse(content, /[\r\n]/, scope.separator || ';', true);
      } catch (e) {
        $log.error(e);
        throw new Error('Error while parsing CSV', e);
      }

      var count = rawObject.length, i = 0;
      var processors = [];
      signal( count, i );

      rawObject.forEach(function(item) {
        var processor = function(cb) {
          $timeout(function() {
            try {
              var formattedItem = {};
              
              for (var key in item) {
                if (item.hasOwnProperty(key)) {
                  var element = item[key];
                  if(_.isString(element) && 
                    (_.startsWith(element, '{') || _.startsWith(element, '['))) {
                    // Assume json
                    try {
                      element = JSON.parse(element.replace(/""/g, '"').replace(/"true"/g, 'true').replace(/"false"/g, 'false'));
                    } catch(e) {
                      // Fallback to original content
                      element = element;
                    }
                    
                  }
                  formattedItem[key] = element;
                  
                }
              }
              
              // formattedOutput.push(formattedItem);
              signal( count, i );
              cb(null, formattedItem);
            } catch(e) {
              $log.debug('Skipped item due to error');
              $log.debug(e);
              skipped++;
              cb(e);
            } finally {
              i++;
            }
          });
          
        };

        processors.push(processor);

      });
      

      return Async.parallelLimit(processors, 4, function done(err, results) {
        if(err) {
          return callback(err);
        } else {
          return callback(null, {
            object: results,
            skippedItems: skipped
          });
        }
      });

      // return { object: formattedOutput, skippedItems: skipped };
    };

    return {
      parse: parse,
    };
  };
 
  module.factory('parser', ['csv', 'lodash', '$log', 'async', '$timeout', parser]);
 
}(angular.module('csvinspector')));