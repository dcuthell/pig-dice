//Business Logic
//Constructors
function Game (){
  this.player1= new Player();
  this.player2 = new Player();
  this.dice = new Dice();
}

function Player() {
  this.score = 0;
}

function Dice() {
  this.tempVal = 0;
}
//Prototypes
Dice.prototype.roll = function(){
  var num = Math.floor(Math.random() * 6) + 1 ;
  if(num === 1){
    console.log("It's a one");
    this.tempVal = 0;
  }else{
    this.tempVal += num;
    console.log("rolled a " + num);
    console.log(this.tempVal);
  }
  return num;
}

Dice.prototype.hold = function(){
  var num = this.tempVal;
  this.tempVal = 0;
  return num;
}

Player.prototype.setScore = function(val){
  this.score += val;
}

//UI
$(document).ready(function(){
  var game = new Game();

  $(".p1.roll").click(function () {
    game.dice.roll();
  });
  $(".p1.hold").click(function () {
    game.player1.setScore(game.dice.hold());
    console.log("P1 Score is now: " + game.player1.score);
  });
  $(".p2.roll").click(function () {
    game.dice.roll();
  });
  $(".p2.hold").click(function () {
    game.player2.setScore(game.dice.hold());
    console.log("P2 Score is now: " + game.player2.score);
  });
});
