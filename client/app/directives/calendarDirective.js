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

  		/**
		 *  Removes the time generated from moment.js. 
		 *	Only the date, month, and year are needed.
		 *	
		 *	@param {Momentjs~moment} date
		 *		A date object to be sanitized.
		 *
		 *	@return
		 *		A date with only year, month, and day.
		 */
  		function removeTime(date) {
  			return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  		}

  		/**
		 *  Calculates a month's date layout and adds it
		 *	to the scope.
		 *	
		 *	@param {$scope} scope
		 *		The scope of the current object.
		 *	@param {Momentjs~moment} start
		 *		The start date of the month.
		 *	@param {Momentjs~moment} month
		 * 		The month to be generated.
		 */
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

  		/**
		 *  Returns an array of date numbers for a given week in a month.
		 *  Determines if the date is the current date and sets the date if 
		 *	it is an available date.
		 *
		 *	@params {Momentjs~moment} date
		 *		The start date of the week.
		 *	@params {Momentjs~moment} month
		 *		The current month being generated.
		 *
		 *	@return
		 *		An array of day objects.
		 */
  		function buildWeek(date, month) {
  			var days = [];
        	for (var i = 0; i < 7; i++) {
            	days.push({
                	name: date.format("dd").substring(0, 1),
                	// number: (date.month() === month.month()) ? date.date() : null,
                	number: date.date(),
                	isCurrentMonth: date.month() === month.month(),
                	isAvailable: isAvailable(date.date()),
                	isToday: date.isSame(new Date(), "day"),
                	date: date
            	});
            	date = date.clone();
            	date.add(1, "d");
        	}
        	return days;
  		}
	});