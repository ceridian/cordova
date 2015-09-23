// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $rootScope, $http) {
  $ionicPlatform.ready(function() {
    datawedge.start();
    datawedge.switchProfile("ACTION");
    datawedge.start("com.bluefletch.motorola.datawedge.ACTION");
    datawedge.registerForBarcode(function(data){
      $rootScope.$apply(function(){
        $rootScope.barcode = data;
      });
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
    .state('/', {
      url: '/',
      templateUrl: 'temps/landing.html'
    })
    .state('pick', {
      url: '/pick',
      templateUrl: 'temps/pick.html',
      controller: 'PickCtrl'
    });

  $urlRouterProvider.otherwise('/');
})
.controller('PickCtrl', function($rootScope, $scope, $http){
  $scope.barcode = '';
  $rootScope.$watch(function(bar){
    return bar.barcode;
  }, function(newVal, oldVal){
    var obj = {
      Authorization: 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
      'Content-Type': 'application/json',
      Body: newVal.barcode
    }
    $http.post('https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1', obj).then(function(res){
      console.log(res.body);
    }, function(res){
      console.log(res.body);
    });
  });
});

/*
https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1
Authorization: NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3
Content-Type: application/json
Body: 180
*/
