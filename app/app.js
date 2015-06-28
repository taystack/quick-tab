'use strict'

var app = angular.module('Histograph', ['ui.router', 'd3']);

app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', function($stateProvider, $urlRouterProvider, $compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|chrome-extension|chrome):/);

  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/templates/home.html'
  })
  .state('windows', {
    url: '/windows',
    templateUrl: 'app/templates/windows/WindowCollection.html'
  })
  .state('history', {
    url: '/history',
    templateUrl: 'app/templates/history/HistoryTable.html'
  })
  .state('downloads', {
    url: '/downloads',
    templateUrl: 'app/templates/downloads/DownloadsTable.html'
  })
}]);
