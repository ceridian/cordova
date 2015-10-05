angular.module('starter.services', [])
.service('scanner', function(){
  var items = [];
  var mpls = [];
  var bins = [];
  var pos = [];
  return {
    item: function(callback){
      items.push(callback);
    },
    mpl: function(callback){
      mpls.push(callback);
    },
    bin: function(callback){
      bins.push(callback);
    },
    po: function(callback){
      pos.push(callback);
    },
    scan: function(data){
      var code = data.barcode;
      var indexM = code.indexOf('MPL');
      var indexI = code.indexOf('-');
      var indexB = /^[a-zA-Z]/.test(code);  // test if starts with letter  // if it does it a bin
      if(indexI > -1){
        // Item
        itemss.forEach(function(cb){
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
        bins.forEach(function(cb){
          cb(code);
        });
      }else{
        // PO
        pos.forEach(function(cb){
          cb(code);
        });
      }
    }
  }
})
.service('commo', function($http){
  return {
    getMPL: function(mpl, callback){
      $http({
        method: 'POST',
        url: 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1',
        headers: {
          'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
          'Content-Type': 'application/json'
        },
        data: mpl
      }).then(function(res){
        var records = res.data.masterList;
        records.forEach(function(record){
          var item = record.item;
          var cut = item.split(':');
          record.item = cut[0];
        });
        cb(records);
      });
    }
  }
});
