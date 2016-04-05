// public/core.js
var g_testJerome = angular.module('testJerome', ['ngAnimate', 'ui.bootstrap','ngMaterial'], function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});
