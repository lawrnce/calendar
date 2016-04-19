/**
 *  Calendar Controller
 *
 *	@param today - 
 */
angular.module('app.controller.calendar', ['app.service.date'])
	.controller('CalendarController', ['$scope', 'DateService', function($scope, DateService) {
		$scope.today = moment();
		$scope.dates = DateService.dates;
	}]);
