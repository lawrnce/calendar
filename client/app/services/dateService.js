/**
 *  Date Service
 *
 *  Service fetches an array of dates from a url
 *  and parses it into a dictionary for readability.
 *
 *  @var {object} dates
 *    An object of dates sorted by YEAR > MONTH > DAY.
 *  @example
 *    {
 *      2016: {
 *        4: [12, 8, 3, 21, 17],
 *        5: [4, 5, 6, 10, 15, 28]
 *      },
 *      2015: {
 *        11: [4, 5, 8]
 *      }
 *    }
 */
angular.module('app.services.date', [])
  .factory('DateService',['$http', 'DATE_API_END_POINT', function($http, DATE_API_END_POINT) {
    var dates = {};
    var refresh = function() {
      var url = DATE_API_END_POINT;
      return $http.get(url).then(function(response) {
        var data = response.data;
        if(data != null) {
          data.forEach(function(dateString) {
            var date = dateString.split('-');
            var year = parseInt(date[0]),
                month = parseInt(date[1]),
                day = parseInt(date[2])
            if (dates[year] === undefined) {
              dates[year] = {};
            }
            if (dates[year][month] === undefined) {
              dates[year][month] = [];
            }
            dates[year][month].push(day);
          });
        }
      });
    };
    refresh();
    return {
      dates : dates
    }
  }]);
