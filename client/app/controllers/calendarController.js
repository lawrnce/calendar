/**
 *  Calendar Controller
 */
angular.module('calendarApp', ['date'])
.controller('CalendarController', ['$scope', 'dateGetter', function($scope) {
  $scope.availableDates = dateGetter.dates;
}]);
