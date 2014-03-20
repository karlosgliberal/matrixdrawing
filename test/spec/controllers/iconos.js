'use strict';

describe('Controller: IconosCtrl', function () {

  // load the controller's module
  beforeEach(module('matrixappApp'));

  var IconosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IconosCtrl = $controller('IconosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
