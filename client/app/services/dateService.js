/**
 *  Date Service
 */
angular.module('Date', [])
.factory('datesGetter', ['$http', function($http) {
  var serverURL = "";
  var dates = ["test1", "test2"];

  var refresh = function() {

  }

  refresh();

  return dates;
}]);
