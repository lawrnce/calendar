/**
 *  app
 */
angular.module('calendarApp', [
	'app.controllers.calendar',
  'app.directives.calendar'
	])
  .constant('DATE_API_END_POINT', 'http://localhost:3000/api/date/');
