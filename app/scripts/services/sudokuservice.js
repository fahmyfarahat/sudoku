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
        
        sudoku.getBoard = function () {
            return http.get(URLS.sudoku);
        };
        
        sudoku.editBoard = function (data) {
            return http.put(URLS.sudoku, data);
        };

        return sudoku;
    }

    angular.module('sudokuBoardApp')
        .service('SudokuService', ['$http', 'URLS', service]);

}).call(null);