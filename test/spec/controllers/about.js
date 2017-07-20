'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('csvinspector'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should instantiate correctly', function () {
    expect(AboutCtrl.awesomeThings).toBe(undefined);
  });
});
