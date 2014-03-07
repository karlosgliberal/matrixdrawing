'use strict';

describe('Controller: SnakeCtrl', function () {

  // load the controller's module
  beforeEach(module('matrixappApp'));

  var SnakeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SnakeCtrl = $controller('SnakeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
