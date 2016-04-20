/**
 *  Calendar Controller
 *
 */
angular.module('app.controllers.calendar', ['app.services.date'])
	.controller('CalendarController', ['$scope', 'DateService', function($scope, DateService) {
		$scope.today = moment();
		$scope.dates = DateService.dates;
	}]);
