//Business Logic
function Game (){
  var player1= new Player();
  var player2 = new Player();
}
 function Player() {
   var score = 0;

 }

 function roll(){
   alert("rolled");
 }

 function hold(){
   alert("held");
 }
//UI
$(document).ready(function(){
  $(".p1.roll").click(function () {
    console.log("player one roll");
  });
  $(".p1.hold").click(function () {
    console.log("player one hold");
  });
  $(".p2.roll").click(function () {
    console.log("player two roll");
  });
  $(".p2.hold").click(function () {
    console.log("player two hold");
  });
});
