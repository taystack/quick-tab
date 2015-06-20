angular.module('Histograph')
.factory('downloadsService', ['$q', function($q) {
  var service = {};

  service.getDownloads = function(queryList) {
    return $q(function(resolve, reject) {
      chrome.downloads.search({"query": queryList}, function(items) {
        resolve(items);
      });
    });
  }

  service.getLastFive = function(queryList) {
    return $q(function(resolve, reject) {
      chrome.downloads.search({"query": queryList, "limit": 5}, function(items) {
        resolve(items);
      });
    });
  }

  return service;
}])