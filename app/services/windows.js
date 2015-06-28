angular.module('Histograph')
.factory('windowsService', ['$q', function($q) {
  var service = {};

  service.getWindows = function() {
    return $q(function(resolve, reject) {
      chrome.windows.getAll({populate: true}, function(items) {
        resolve(items);
      });
    });
  }

  service.getWindow = function(id_) {
    return $q(function(resolve, reject) {
      chrome.windows.get({populate: true}, function(items) {
        resolve(items);
      });
    });
  }

  return service;
}])