// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    datawedge.start();
    datawedge.registerForBarcode(function(data){
      var labelType = data.type,
      barcode   = data.barcode;

      console.log("Barcode scanned.  Label type is: " + labelType + ", " + barcode);
    });

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'start'
  })
  .state('stop', {
    url: '/stop',
    templateUrl: 'stop'
  });
   $urlRouterProvider.otherwise("/");
})
.controller('ViewCtrl', function($scope){
  $scope.loc = window.location.pathname;

});
