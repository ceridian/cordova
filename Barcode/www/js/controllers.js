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
.controller('StockCtrl', function($scope, scanner, commo){
  $scope.deleteShow = false;
  $scope.reorderShow = false;
  $scope.listSwipe = true;
  $scope.items = [];
  $scope.createddate = '';
  $scope.tranid = '';
  scanner.po(function(data){
    commo.getPO(data, function(records){
      var record = records.data;
      alert(JSON.stringify(record.item));
      record.item.forEach(function(i){
        var cut = i.item.name.split(' ');
        i.name = cut[0];
      });
      $scope.items = record.item;
      $scope.createddate = record.createddate;
      $scope.tranid = record.tranid;
    });
  });
  $scope.info = function(m){

  }
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
