/**
 *  Calendar Directive
 */
angular.module('app.directive.calendar', [])
	.directive('calendar', function() {
  		return {
    		restrict : 'E',
    		// scope: {},
    		templateUrl : "templates/calendar.html"
  		};
	});
