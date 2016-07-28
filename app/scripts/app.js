'use strict';

/**
 * @ngdoc overview
 * @name sudokuBoardApp
 * @description
 * # sudokuBoardApp
 *
 * Main module of the application.
 */
  (function(){
    var modules = [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ];
    var sudokuApp = angular.module('sudokuBoardApp', modules);


    sudokuApp.constant('URLS', {
        'sudoku':'https://afternoon-mountain-94217.herokuapp.com/sudoku/'
    });
    
    sudokuApp.config(function ($routeProvider) {
        $routeProvider
            .when('/', { 
                templateUrl: 'views/main.html', 
                controller: 'MainCtrl', 
                controllerAs: 'main' 
            })
            .otherwise({
                redirectTo: '/'
            });
    });
  })();
