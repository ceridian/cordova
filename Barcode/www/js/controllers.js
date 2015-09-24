angular.module('starter.controllers', [])
.controller('PickCtrl', function($scope, $ionicModal, scanner){
  $scope.deleteShow = false;
  $scope.reorderShow = false;
  $scope.listSwipe = true;
  $scope.header = true;
  $scope.mpl = [];
  $scope.selectedItem = '';
  scanner.pick(function(data){
    $scope.header = false;
    $scope.mpl = data;
  });
  scanner.item(function(data){
    var item = data.code;
    alert('Item: '+$scope.mpl.length);
  });
  scanner.bin(function(data){
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
});
