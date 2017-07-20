'use strict';

/**
 * @ngdoc overview
 * @name csvinspector
 * @description
 * # csvinspector
 *
 * Main module of the application.
 */

var meme = [
'',
'',
'      INSPECT ALL THE CVS!',
'',
'',
'─────────────────────────────▄██▄',
'─────────────────────────────▀███',
'────────────────────────────────█',
'───────────────▄▄▄▄▄────────────█',
'──────────────▀▄────▀▄──────────█',
'──────────▄▀▀▀▄─█▄▄▄▄█▄▄─▄▀▀▀▄──█',
'─────────█──▄──█────────█───▄─█─█',
'─────────▀▄───▄▀────────▀▄───▄▀─█',
'──────────█▀▀▀────────────▀▀▀─█─█',
'──────────█───────────────────█─█',
'▄▀▄▄▀▄────█──▄█▀█▀█▀█▀█▀█▄────█─█',
'█▒▒▒▒█────█──█████████████▄───█─█',
'█▒▒▒▒█────█──██████████████▄──█─█',
'█▒▒▒▒█────█───██████████████▄─█─█',
'█▒▒▒▒█────█────██████████████─█─█',
'█▒▒▒▒█────█───██████████████▀─█─█',
'█▒▒▒▒█───██───██████████████──█─█',
'▀████▀──██▀█──█████████████▀──█▄█',
'──██───██──▀█──█▄█▄█▄█▄█▄█▀──▄█▀',
'──██──██────▀█─────────────▄▀▓█',
'──██─██──────▀█▀▄▄▄▄▄▄▄▄▄▀▀▓▓▓█',
'──████────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█',
'──███─────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█',
'──██──────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█',
'──██──────────█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█',
'──██─────────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█',
'──██────────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█',
'──██───────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌',
'──██──────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌',
'──██─────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌',
'──██────▐█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▌'];
console.log(meme.join('\n'));

angular
  .module('csvinspector', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('csv', function($window) {
    return {
      parser: $window.CSV
    };
  }).factory('lodash', function($window) {
    return {
      _: $window._,
    };
  }).factory('async', function($window) {
    return {
      instance: $window.async,
    };
  });
