angular.module('Histograph')
.factory('processService', ['$q', function($q) {
  var service = {};

  service.tabProcesses = function(tabId) {
    return $q(function(resolve, reject) {
      chrome.processes.getProcessIdForTab(tabId, function (items) {
        console.log(items)
        resolve(items);
      });
    });
  }

  service.getProcessInfo = function(processIds, memory) {
    var mem = memory || true;

    return $q(function(resolve, reject) {
      chrome.processes.getProcessInfo(processIds, mem, function (items){
        resolve(items);
      });
    });
  }

  return service;
}])