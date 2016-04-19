/**
 *  Date Service
 */
angular.module('app.service.date', [])
	.factory('DateService', function() {
		var dates = ["2016-04-20", "2016-04-21", "2016-04-25"];
		return {
			dates : dates
		}
	});