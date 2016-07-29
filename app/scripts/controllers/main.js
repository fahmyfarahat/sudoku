'use strict';
/**
 * @ngdoc function
 * @name sudokuBoardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sudokuBoardApp
 */
(function(){
    function controller(scope, SudokuService){

        function success(response) {
            scope.orignalBoard = response.data.sudokuBoard;
            scope.sudokuBoard = SudokuService.sudokuBoardBuilder(response.data.sudokuBoard, false);
        }

        function error(response) {
            if (response.statusText === 'Conflict') {
                var conflictRow = response.data.conflictRow;
                var conflictColumn = response.data.conflictColumn;
                scope.sudokuBoard[conflictRow][conflictColumn]['error'] = true;
                scope.sudokuBoard[scope.data.moveRow][scope.data.moveColumn]['error'] = true;
            } 
        }

        SudokuService.getBoard().then(success, error);

        scope.edit = function(model) {
            scope.data = {
                'moveRow': model.rowNum,
                'moveColumn': model.colNum,
                'moveValue': model.val
            };
            if ((model.val > 0) && (model.val < 10)) {
                scope.orignalBoard[model.rowNum][model.colNum] = model.val
                scope.data['sudokuBoard'] = scope.orignalBoard; 
                SudokuService.editBoard(scope.data)
                .then(function(response){
                    scope.sudokuBoard = SudokuService.sudokuBoardBuilder(response.data.board, true);
                    scope.sudokuBoard[scope.data.moveRow][scope.data.moveColumn]['valid'] = true;
                }, error);
            }else{
                scope.sudokuBoard[scope.data.moveRow][scope.data.moveColumn]['error'] = true;
            }
        };


    }

    angular.module('sudokuBoardApp')
        .controller('MainCtrl', [ '$scope', 'SudokuService', controller]);
}).call(null);