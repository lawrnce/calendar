/**
 *  Calendar Directive
 */
angular.module('calendarApp', [])
.directive('calendar', function({
  return {
    restrict: 'E',
    replace: 'true',
    template: '../../views/templates/calendar.html'
  }
}));
