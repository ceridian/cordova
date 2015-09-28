angular.module('starter.controllers', [])
.controller('PickCtrl', function($scope, $ionicModal, scannerPick){
  $scope.deleteShow = false;
  $scope.reorderShow = false;
  $scope.listSwipe = true;
  $scope.header = true;
  $scope.mpl = [];
  $scope.selectedItem = '';
  scannerPick.pick(function(data){
    $scope.header = false;
    $scope.mpl = data;
  });
  scannerPick.item(function(data){
    var item = data.code;
    alert('Item: '+$scope.mpl.length);
  });
  scannerPick.bin(function(data){
    var bin = data.code;
    alert('Bin: '+$scope.mpl.length);
  });

  $scope.info = function(item){
    $scope.selectedItem = item;
    $ionicModal.fromTemplateUrl('temps/info.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $scope.openModal();
    });
  }
})
.controller('StockCtrl', function($scope, scannerStock){
  scannerStock.order(function(data){
    var order = data.code;
    alert('Order: '+order);
  });
  scannerStock.item(function(data){
    var item = data.code;
    alert('Item: '+item);
  });
  scannerStock.bin(function(data){
    var bin = data.code;
    alert('Bin: '+bin);
  });
});
