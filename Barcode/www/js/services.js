angular.module('starter.services', [])
.service('scanner', function($state){
  var items = [];
  var mpls = [];
  var trans = [];
  var pos = [];
  return {
    item: function(callback){
      items.push(callback);
    },
    mpl: function(callback){
      mpls.push(callback);
    },
    tran: function(callback){
      trans.push(callback);
    },
    po: function(callback){
      pos.push(callback);
    },
    scan: function(data){
      var state = $state.current.name;
      //alert(state);
      if(state == "app.transfer"){
        trans.forEach(function(cb){
          cb(data);
        });
      }else if(state == 'app.picking'){
        mpls.forEach(function(cb){
          cb(data);
        });
      }else if(state == 'app.stocking'){
        pos.forEach(function(cb){
          cb(data);
        });
      }else if(state == 'app.item'){
        items.forEach(function(cb){
          cb(data);
        });
      }else{
        alert("Error: Incorrect State: "+state);
      }
      /*var indexM = code.indexOf('MPL');
      var indexI = code.indexOf('-');
      var indexB = /^[a-zA-Z]/.test(code);  // test if starts with letter  // if it does it a bin
      if(indexI > -1){
        // Item
        items.forEach(function(cb){
          cb(code);
        });
      }else if (indexM > -1) {
        // MPL
        var list = code.slice(3);
        mpls.forEach(function(cb){
          cb(list);
        });
      }else if (indexB) {
        // Bin
        trans.forEach(function(cb){
          cb(code);
        });
      }else{
        // PO
        pos.forEach(function(cb){
          cb(code);
        });
      }*/
    }
  }
})
.service('sender', function($http, $ionicLoading){
  return {
    post: function(url, body, callback){
      $ionicLoading.show({
        template: '<img src="img/ajax-loader.gif" style="width:100px;height:20px;">'
      });
      $http({
        method: 'POST',
        url: url,
        headers: {
          'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(body)
      }).then(function(res){
        $ionicLoading.hide();
        callback(res);
      });
    }
  }
})
.service('commo', function(sender){
  return {
    getMPL: function(mpl, callback){
      var url = 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=180&deploy=1';
      var body = {mpl: mpl};
      sender.post(url, body, function(res){
        callback(res);
      });
    },
    getPO: function(po, callback){
      var url = 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=195&deploy=1';
      var body = {po: po};
      sender.post(url, body, function(res){
        callback(res);
      });
    }
  }
});
