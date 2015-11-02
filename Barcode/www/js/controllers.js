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
.controller('TransCtrl', function($scope, scanner){
  scanner.tran(function(data){
    alert("Bin: "+data.barcode);
  });
  $scope.title = "Scan Bin";
})
.controller('StockCtrl', function($scope, scanner, commo){
  $scope.deleteShow = false;
  $scope.reorderShow = false;
  $scope.listSwipe = false;
  $scope.items = [];
  $scope.createddate = '';
  $scope.tranid = '';
  scanner.scan();
  scanner.po(function(data){
    alert("Stock: "+data.barcode);
    /*commo.getPO(data, function(records){
      var record = records.data;
      alert(JSON.stringify(record.item));
      record.item.forEach(function(i){
        var cut = i.item.name.split(' ');
        i.name = cut[0];
      });
      $scope.items = record.item;
      $scope.createddate = record.createddate;
      $scope.tranid = record.tranid;
      $scope.title = "Scan Item";
    });*/
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
    alert("Pick:"+data.barcode);
    /*commo.getMPL(data, function(records){
      $scope.mpl = records;
    });*/
  });
  $scope.info = function(m){

  }
  $scope.title = "Scan MPL";
})
.controller('ItemCtrl', function($scope, scanner, commo){
  scanner.item(function(data){
    alert("Item:"+data.barcode);
  });
  $scope.title = "Item Lookup";
});
