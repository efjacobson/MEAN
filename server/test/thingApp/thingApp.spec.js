describe('Unit: thingApp', function() {
	var module;
	beforeEach(function() {
		module = angular.module('thingApp');
	});

	it('should be registered', function() {
		expect(module).not.toEqual(null);
	});

	it('should be defined', function() {
		expect(module).not.toBeUndefined();
	});
});
