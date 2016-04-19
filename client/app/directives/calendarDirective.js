/**
 *  Calendar Directive
 */
angular.module('app.directive.calendar', [])
	.directive('calendar', function() {
  		return {
    		// restrict : 'E',
    		// scope: {},
    		templateUrl : "../../views/templates/calendar.html"
    		// template: "<h1>ASD</h1>"
  		};
	});
