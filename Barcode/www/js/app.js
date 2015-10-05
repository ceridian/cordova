// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform, scanner) {
  $ionicPlatform.ready(function() {
    datawedge.start("com.bluefletch.motorola.datawedge.ACTION");
    datawedge.registerForBarcode(function(data){
      scanner.scan(data);
    });
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.setBin', {
    url: '/bin',
    views: {
      'menuContent': {
        templateUrl: 'templates/set-bin.html',
        controller: 'BinCtrl'
      }
    }
  })
  .state('app.picking', {
    url: '/picking',
    views: {
      'menuContent': {
        templateUrl: 'templates/picking.html',
        controller: 'PickCtrl'
      }
    }
  })
  .state('app.stocking', {
    url: '/stocking',
    views: {
      'menuContent': {
        templateUrl: 'templates/stocking.html',
        controller: 'StockCtrl'
      }
    }
  })
  .state('app.landing', {
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing.html',
        controller: 'LandingCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/landing');
});
