angular.module('calendar', ['app.services.date'])
.directive('myCalendar', ['$compile', 'DateService', function($compile, DateService) {
  return {
    restrict : 'E',
    templateUrl : "app/calendar/calendar.html",
    css: "css/calendar.css",
    link: function(scope, element, attrs) {
      scope.$watch(
        function () {
          return DateService.dates;
        },
        function (newValue, oldValue) {
          scope.dates = newValue;
          scope.current = removeTime(moment());
          scope.month = scope.current.clone();

          var start = scope.current.clone();
          start.date(1);
          removeTime(start.day(0));
          buildMonth(scope, start, scope.month)

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
        },
        true
      );
    }
  };

  /**
   *	Determines if a given date is available.
   *
   *	@param {$scope} scope
   *		The scope of the current object.
   *	@param {Momentjs~moment} date
   *		A date to be compared.
   *
   *	@return
   *		A boolean determining if available.
   */
  function isAvailable(scope, date) {
    if (Object.keys(scope.dates).length === 0) {
      return false;
    }
    var year = date.year(),
      month = date.month() + 1, // momentjs is 0 indexed
        day = date.date();
        if(scope.dates[year][month] !== undefined) {
          return scope.dates[year][month].includes(day);
        } else {
          return false
        }
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
    var done = false,
      date = start.clone(),
        monthIndex = date.month(),
          count = 0;
          while(!done) {
            scope.weeks.push({days: buildWeek(scope, date.clone(), month)});
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
   *	@param {$scope} scope
   *		The scope of the current object.
   *	@params {Momentjs~moment} date
   *		The start date of the week.
   *	@params {Momentjs~moment} month
   *		The current month being generated.
   *
   *	@return
   *		An array of day objects.
   */
  function buildWeek(scope, date, month) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        isAvailable: isAvailable(scope, date),
        date: date
      });
      date = date.clone();
      date.add(1, "d");
    }
    return days;
  }
}]);
