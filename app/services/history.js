angular.module('Histograph')
.factory('historyService', ['$q', function($q) {
  var service = {};

  service.getHistory = function(query) {
    return $q(function(resolve, reject) {
      chrome.history.search({"text": query}, function(items) {
        resolve(items);
      });
    });
  }

  service.getLastFive = function(query) {
    return $q(function(resolve, reject) {
      chrome.history.search({"text": query, "maxResults": 5}, function(items) {
        resolve(items);
      });
    });
  }

  return service;
}])