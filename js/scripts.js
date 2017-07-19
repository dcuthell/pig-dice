//Business Logic
//Constructors
function Game (){
  this.player1= new Player();
  this.player2 = new Player();
  this.dice = new Dice();
  this.num = 16;
}

function Player() {
  this.score = 0;
}

function Dice() {
  this.tempVal = 12;
}
//Prototypes



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
    var game = new Game();
    alert(game.dice.tempVal);
  });
});
