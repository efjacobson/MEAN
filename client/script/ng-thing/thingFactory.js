(function() {
	'use strict';

	angular.module('thingApp').factory('thingFactory', thingFactory);

	thingFactory.$inject = ['$q', '$http'];

	function thingFactory($q, $http) {
		var factory = {
			getAll : _getAll
		};

		return factory;

		function _getAll() {
			var deferred = $q.defer();

			$http({
			method : 'GET',
			url : 'api/thing'
			}).then(successResponse => {
				deferred.resolve(successResponse);
			}, errorResponse => {
				deferred.reject(errorResponse);
			});

			return deferred.promise;
		}

	}

})();
