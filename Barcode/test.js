var request = require('request');

function start(){
  var url = "https://rest.na1.netsuite.com/app/site/hosting/restlet.nl?script=177&deploy=1";
  var options = {
    method: 'POST',
    url: url,
    headers: {
      'Authorization': 'NLAuth nlauth_account=277620,nlauth_email=jake@zake.com,nlauth_signature=@Eldar4242,nlauth_role=3',
      'Content-Type': 'application/json'
    },
    body: '180'
  }
  request(options, function(err, res, bod){
    if(err){
      console.log(err);
    }else{
      console.log(JSON.parse(bod));
    }
  });
}
start();
