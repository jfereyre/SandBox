// public/core.js
var g_testJerome = angular.module('testJerome', ['ngAnimate', 'ngAria', 'ngRoute', 'ui.bootstrap','ngSanitize','ui.tree','ngMessages'], function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});
