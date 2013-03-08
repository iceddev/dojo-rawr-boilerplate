require([
  'dojo/on',
  'rawr/client',
  'dojo/domReady!'
], function(on, Rawr){

  'use strict';

  var rawr = new Rawr(eio('ws://localhost:3000/'));

  var showResult = function(result, timeStart){
    document.getElementById('result').innerHTML = result;
    document.getElementById('elapsedTime').innerHTML = Date.now() - timeStart;
  };

  rawr.then(function(methods){
    on(document, '#wbutton:click', function(){
      var timeStart = Date.now();
      methods.square(document.getElementById('num1').value).then(function(result){
        showResult(result,timeStart);
      }, function(result){
        showResult(result,timeStart);
      });
    });
  });

  console.log(rawr);

});