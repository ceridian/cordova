(function(){
  document.addEventListener("deviceready", function(){
    datawedge.start();
    datawedge.switchProfile("ACTION");
    datawedge.start("com.bluefletch.motorola.datawedge.ACTION");
    datawedge.registerForBarcode(function(data){
      $('#disp').text(JSON.stringify(data));
    });
  });
})();
