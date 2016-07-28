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
        
        scope.value = null;

        function success(response) {
            scope.sudokuBoard = response.data.sudokuBoard;
        }

        function error(response) {
            console.log('Error: ', response);
            if (response.statusText === 'Conflict') {
                var conflictRow = response.data.conflictRow;
                var conflictColumn = response.data.conflictColumn;
                //useing jQuery just to appeand error class.
                $('.'+conflictRow+''+conflictColumn).addClass('error');
                //Reset Edited
                scope.sudokuBoard[scope.currentRow][scope.currentCol] = 0;
            } 
        }

        SudokuService.getBoard().then(success, error);

        scope.classError = function(index, rows){
            var conflictRow = scope.sudokuBoard.indexOf(rows);
            return conflictRow +''+index;
        };

        scope.edit = function(col, value, rows) {
            if (((value > 0) && (value < 10))) {
                scope.error = false;
                scope.currentRow = scope.sudokuBoard.indexOf(rows);
                scope.currentCol = col;
                var data = {
                    'moveRow': scope.currentRow,
                    'moveColumn': scope.currentCol,
                    'moveValue': value
                };
                scope.sudokuBoard[scope.currentRow][scope.currentCol] = value;

                // Change val of sudokuBoard.
                data.sudokuBoard = scope.sudokuBoard;
                SudokuService.editBoard(data)
                .then(function(response){
                    scope.sudokuBoard = response.data.board;
                }, error);
            }else{
                scope.error = true;
            }
        };


    }

    angular.module('sudokuBoardApp')
        .controller('MainCtrl', [ '$scope', 'SudokuService', controller]);
}).call(null);