/**
 *  Calendar Directive
 */
angular.module('app.directive.calendar', [])
	.directive('calendar', function() {
  		return {
    		restrict : 'E',
    		scope: {
    			current: "=",
    			available: "=",
    			selected: "="
    		},
    		templateUrl : "templates/calendar/calendar.html",
    		css: "templates/calendar/calendar.css",
    		link: function(scope) {

    			scope.selected = removeTime(scope.selected || moment());

    			scope.current = removeTime(scope.selected || moment());
    			scope.month = scope.current.clone();

    			var start = scope.current.clone();
    			start.date(1);
    			removeTime(start.day(0));
    			buildMonth(scope, start, scope.month)

				scope.select = function(day) {
                	scope.selected = day.date;  
            	};

    			scope.next = function() {
    				var next = scope.month.clone();
                	removeTime(next.month(next.month()+1).date(1));
                	scope.month.month(scope.month.month()+1);
                	buildMonth(scope, next, scope.month);
    			};

    			scope.previous = function() {
    				var previous = scope.month.clone();
    				removeTime(previous.month(previous.month()-1).date(1));
					scope.month.month(scope.month.month()-1);
                	buildMonth(scope, previous, scope.month);
    			};
    		}
  		};

  		function isAvailable(date) {

  			return true
  		}

  		function removeTime(date) {
  			return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  		}

  		function buildMonth(scope, start, month) {
  			scope.weeks = [];
  			var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
  			while(!done) {
  				scope.weeks.push({days: buildWeek(date.clone(), month)});
  				date.add(1, "w");
  				done = count++ > 2 && monthIndex !== date.month();
  				monthIndex = date.month();
  			}
  		}

  		function buildWeek(date, month) {
  			var days = [];
        	for (var i = 0; i < 7; i++) {
            	days.push({
                	name: date.format("dd").substring(0, 1),
                	number: (date.month() === month.month()) ? date.date() : null,
                	isAvailable: isAvailable(date.date()),
                	date: date
            	});
            	date = date.clone();
            	date.add(1, "d");
        	}
        	return days;
  		}
	});