/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function init(){
  var startTemp = Handlebars.compile($("#startTemp").html());
  var stopTemp = Handlebars.compile($("#stopTemp").html());

  router.addRoute('', function(){
    $('#holder').html(startTemp());
  });

  router.addRoute('/start', function(){
    $('#holder').html(startTemp());
  });

  router.addRoute('/stop', function(){
    $('#holder').html(stopTemp());
  });

  router.start()

  document.addEventListener("deviceready", function(){
    datawedge.start();
    datawedge.registerForBarcode(function(data){
      var labelType = data.type,
      barcode   = data.barcode;

      console.log("Barcode scanned.  Label type is: " + labelType + ", " + barcode);
    });
    $('#start').on('click touchstart', function() {
      Start();
    });
    $('#stop').on('click touchstart', function() {
      Stop();
    });
  });
}

function Start(){
  datawedge.startScanner();
}

function Stop(){
  datawedge.stopScanner();
}
/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        datawedge.start();
        datawedge.registerForBarcode(function(data){
           var labelType = data.type,
               barcode   = data.barcode;

           console.log("Barcode scanned.  Label type is: " + labelType + ", " + barcode);

           //TODO: handle barcode/label type
       });
    }
};

app.initialize();*/
