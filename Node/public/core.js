// public/core.js
var g_testJerome = angular.module('testJerome', ['ngAnimate', 'ngRoute', 'ui.bootstrap','ngSanitize'], function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});
