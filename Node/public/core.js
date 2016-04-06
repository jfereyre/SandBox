// public/core.js
var g_testJerome = angular.module('testJerome', ['ngAnimate', 'ngRoute', 'ui.bootstrap','ngMaterial', 'ngSanitize'], function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});
