(function() {
	'use strict';

	angular.module("thingApp").controller("thingController", thingController);

	thingController.$inject = ['$log', 'thingFactory'];

	function thingController($log, thingFactory) {
		var vm = this;

		activate();

		function activate() {
			_getAllThings();
		}

		function _getAllThings() {
			thingFactory.getAll().then(successResponse => {
				$log.log(successResponse);
			}, errorResponse => {
				$log.error(errorResponse)
			});
		}

	}

})();
