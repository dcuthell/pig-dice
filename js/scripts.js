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
  var num = [0,0];
  num[0] = Math.floor(Math.random() * 6) + 1 ;
  num[1] = Math.floor(Math.random() * 6) + 1 ;
  if(num[0] === 1 && num[1] === 1){
    console.log("You lost it all");
    this.tempVal = 0;
  }else if(num[0] === 1 || num[1] === 1){
    this.tempVal = 0;
    console.log("rolled a " + num[0] + "and a " + num[1] + " . Too bad!");
  }else{
    this.tempVal += num[0];
    this.tempVal += num[1];
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

Player.prototype.zeroScore = function(){
  this.score = 0;
}

//UI
$(document).ready(function(){
  var game = new Game();
  var rollResult = [0,0];
  $(".p1.roll").show();
  $(".p1.roll").click(function () {
    $(".p1.hold").show();
    rollResult = game.dice.roll();
    if(rollResult[0] === 1 && rollResult[1] === 1){
      game.player1.zeroScore();
      $(".p1.roll").hide();
      $(".p1.hold").hide();
      $(".p2.roll").show();
      $(".p2.hold").show();
    }
    if(rollResult[0] === 1 || rollResult[1] === 1){
      $(".p1.roll").hide();
      $(".p1.hold").hide();
      $(".p2.roll").show();
      $(".p2.hold").show();
    }
    $("#rollResult").text(rollResult);

    $("#p1Score").text(game.player1.score + game.dice.tempVal);
    if(game.player1.score + game.dice.tempVal >= 100){
      alert("Player 1 wins!");
    }
  });
  $(".p1.hold").click(function () {
    game.player1.setScore(game.dice.hold());
    console.log("P1 Score is now: " + game.player1.score);
    $("#p1Score").text(game.player1.score);
    $(".p1.roll").hide();
    $(".p1.hold").hide();
    $(".p2.roll").show();
    $(".p2.hold").show();
  });
  $(".p2.roll").click(function () {
    rollResult = game.dice.roll();
    if(rollResult[0] === 1 && rollResult[1] === 1){
      game.player2.zeroScore();
      $(".p2.roll").hide();
      $(".p2.hold").hide();
      $(".p1.roll").show();
      $(".p1.hold").show();
    }
    if(rollResult[0] === 1 || rollResult[1] === 1){
      $(".p2.roll").hide();
      $(".p2.hold").hide();
      $(".p1.roll").show();
      $(".p1.hold").show();
    }
    $("#rollResult").text(rollResult);

    $("#p2Score").text(game.player2.score + game.dice.tempVal);
    if(game.player2.score + game.dice.tempVal >= 100){
      alert("Player 2 wins!");
    }
  });
  $(".p2.hold").click(function () {
    game.player2.setScore(game.dice.hold());
    console.log("P2 Score is now: " + game.player2.score);
    $("#p2Score").text(game.player2.score);
    $(".p2.roll").hide();
    $(".p2.hold").hide();
    $(".p1.roll").show();
    $(".p1.hold").show();
  });
});
