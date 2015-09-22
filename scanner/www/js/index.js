(function(){
  //$('#stop').hide();
  document.addEventListener("deviceready", function(){
    datawedge.start();
    datawedge.registerForBarcode(function(data){
      console.log(data);
      $('#display').text(data);
    });
  }, false);

  $('#start').on("touchend", function(){
    $('#start').hide();
    $('#stop').show();
    datawedge.startScanner();
  });
  $('#stop').on("touchend", function(){
    $('#stop').hide();
    $('#start').show();
    datawedge.stopScanner();
  });
}());
