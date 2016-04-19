/**
 *  Date Service
 *
 *	Service fetches an array of dates from a url
 *	and parses it into a dictionary for readability.
 *
 *	@var {object} dates
 *		An object of dates sorted by YEAR > MONTH > DAY.
 */
angular.module('app.service.date', [])
	.factory('DateService', function() {
		var dates = {
			2016: {
				4: [12, 8, 3, 21, 17],
				5: [4, 5, 6, 10, 15, 28]
			},
			2015: {
				11: [4, 5, 8]
			}
		};
		return {
			dates : dates
		}
	});