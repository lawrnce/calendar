/**
 *  Calendar Controller
 */
angular.module('app.controller.calendar', ['app.service.date'])
	.controller('CalendarController', ['$scope', 'DateService', function($scope, DateService) {
		$scope.availableDates = DateService.dates;
	}]);
