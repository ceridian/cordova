angular.module('starter.services', [])
.service('scanner', function($rootScope, $http){
  var listeners = [];
  var picks = [];
  return {
    listener: function(callback){
      listeners.push(callback);
    },
    pick: function(callback){
      picks.push(callback);
    },
    scan: function(data){
      var code = data.barcode;
      var index = code.indexOf('MPL');
      if(index > -1){
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
      }else{
        listeners.forEach(function(cb){
          var obj = {};
          obj.code = code;
          cb(obj);
        });
      }
    }

    /*scan: function(callback){
      $rootScope.$watch(function(bar){
        return bar.barcode;
      }, function(newVal, oldVal){
        //var code = newVal.barcode;
        //var index = code.indexof('MPL');
        callback(newVal);
        if(index > -1){
          $http({
            method: 'POST',
            url: 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?script=129&deploy=1',
            headers: {
              'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
              'Content-Type': 'application/json'
            },
            data: newVal.barcode
          }).then(function(res){
            callback.apply(res.data);
          }, function(res){
            callback.apply(res.data);
          });
        }
      });
    }*/
  }
});
