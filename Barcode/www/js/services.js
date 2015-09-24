angular.module('starter.services', [])
.service('scanner', function($rootScope, $http){
  var items = [];
  var picks = [];
  var bins = [];
  return {
    item: function(callback){
      items.push(callback);
    },
    pick: function(callback){
      picks.push(callback);
    },
    bin: function(callback){
      bins.push(callback);
    },
    scan: function(data){
      var code = data.barcode;
      var indexP = code.indexOf('MPL');
      var indexB = /^[a-zA-Z]/.test(code);
      if(indexP > -1){
        // gets master picking list
        picks.forEach(function(cb){
          var list = code.slice(3);
          $http({
            method: 'POST',
            url: 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1',
            headers: {
              'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
              'Content-Type': 'application/json'
            },
            data: list
          }).then(function(res){
            var records = res.data.masterList;
            records.forEach(function(record){
              var item = record.item;
              var cut = item.split(':');
              record.item = cut[0];
            });
            cb(records);
          });
        });
      }else if(indexB){
        bins.forEach(function(cb){
          var obj = {};
          obj.code = code;
          cb(obj);
        });
      }else{
        items.forEach(function(cb){
          var obj = {};
          obj.code = code;
          cb(obj);
        });
      }
    }
  }
});
