'use strict';

describe('Service: sudokuService', function () {

  // load the service's module
  beforeEach(module('sudokuBoardApp'));

  // instantiate service
  var sudokuService;
  beforeEach(inject(function (_sudokuService_) {
    sudokuService = _sudokuService_;
  }));

  it('should do something', function () {
    expect(!!sudokuService).toBe(true);
  });

});
