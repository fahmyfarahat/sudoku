'use strict';

/**
 * @ngdoc service
 * @name sudokuBoardApp.sudokuService
 * @description
 * # sudokuService
 * Service in the sudokuBoardApp.
 */
(function (){
    function service(http, URLS) {

        var sudoku = {};

        function _RowsBuilder(val, rowNum, isNewResolve) {
            var data = [];
            for(var i=0; val.length > i; i++){
                data[i] = {
                    'val': null,
                    'rowNum': rowNum,
                    'colNum':i,
                };
                if (val[i] !== 0) {
                    data[i].val = val[i];
                    data[i].resolved = true;
                    data[i].isNewResolve = (isNewResolve) ? true: false;
                }
            }
            return data;
        }
        
        sudoku.getBoard = function () {
            return http.get(URLS.sudoku);
        };
        
        sudoku.editBoard = function (data) {
            return http.put(URLS.sudoku, data);
        };

        sudoku.sudokuBoardBuilder = function(data, isNewResolve){
            var sudokuBoard = [];
            for(var i=0; data.length > i; i++){
                sudokuBoard.push(_RowsBuilder(data[i], i, isNewResolve));
            }
            return sudokuBoard;
        };

        return sudoku;
    }

    angular.module('sudokuBoardApp')
        .service('SudokuService', ['$http', 'URLS', service]);

}).call(null);