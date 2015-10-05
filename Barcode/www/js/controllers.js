angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})
.controller('LandingCtrl', function($scope, $timeout){
  $scope.title = "Simple Scanner";
})
.controller('BinCtrl', function($scope, scanner){
  scanner.bin(function(data){
    alert("Bin: "+data);
  });
  $scope.title = "Scan Bin";
})
.controller('StockCtrl', function($scope, scanner){
  scanner.po(function(data){
    alert("PO: "+data);
  });
  $scope.title = "Scan PO";
})
.controller('PickCtrl', function($scope, scanner, commo){
  $scope.deleteShow = false;
  $scope.reorderShow = false;
  $scope.listSwipe = true;
  $scope.mpl = [];
  scanner.mpl(function(data){
    commo.getMPL(data, function(records){
      $scope.mpl = records;
    });
  });
  $scope.info = function(m){

  }
  $scope.title = "Scan MPL";
});
