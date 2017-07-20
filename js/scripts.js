//Business Logic
//Constructors
function Game (){
  this.player1= new Player();
  this.player2 = new Player();
  this.dice = [];
}

function Player() {
  this.score = 0;
  this.tempScore = 0;
  this.turnVal = 0;
}

function Dice() {
  this.lastRoll = 0;
  this.tempVal = 0;
}
//Prototypes

Game.prototype.createDice = function(number){
  for(i = 0; i < number; i++){
    this.dice[i] = new Dice();
  }
}

Game.prototype.roll = function(player){
  player.turnVal = 1;
  var rollResults = [];
  for(i=0; i < this.dice.length; i++){
    this.dice[i].roll();
    rollResults.push(this.dice[i].lastRoll);
  }
  if(this.dice.length === 1 && this.dice[0].lastRoll === 1){
    console.log("rolled a one with one die");
    player.tempScore = player.score;
    player.turnVal = 0;
    return rollResults;
  }
  if(this.dice.length !== 1){
    var ones = 0;
    for(i=0; i < this.dice.length; i++){
      ones += this.dice[i].lastRoll;
    }
    if(ones === this.dice.length){
      player.score = 0;
      player.tempScore = 0;
      console.log("Snake eyes, you lose it all!");
      player.turnVal = 0;
      return rollResults;
    }
    for(i=0; i < this.dice.length; i++){
      if(this.dice[i].lastRoll === 1){
        console.log("You rolled a one on one of your dice");
        player.tempScore = player.score;
        player.turnVal = 0;
        return rollResults;
      }
    }
  }
  var newRolls = 0;
  for(i=0; i < this.dice.length; i++){
    newRolls += this.dice[i].lastRoll;
  }
  player.tempScore += newRolls;
  console.log("you rolled stuff");
  if(player.tempScore >= 100){
    alert("You win!");
  }
  return rollResults;
}

Game.prototype.hold = function(player){
  player.score = player.tempScore;
  player.turnVal = 0;
}

Dice.prototype.roll = function(){
  var num = Math.floor(Math.random() * 6) + 1 ;
  if(num === 1){
    console.log("It's a one");
    this.lastRoll = 1;
    this.tempVal = 0;
  }else{
    this.lastRoll = num;
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
  // var diceNum = parseInt($("#diceNum").val());
  $("#btn1").click(function(){
    game.createDice(1);
    $(".row").show();
    $(".diceBtn").hide();
  });
  $("#btn2").click(function(){
    game.createDice(2);
    $(".row").show();
    $(".diceBtn").hide();
  });
  $(".p1.roll").show();
  $(".p1.roll").click(function () {
    $(".p1.hold").show();
    var rollResult = game.roll(game.player1);
    if(game.player1.turnVal === 0){
      $(".p1.roll").hide();
      $(".p1.hold").hide();
      $(".p2.roll").show();
      $(".p2.hold").show();
    }
    $("#rollResult").text(rollResult);
    $("#p1Score").text(game.player1.tempScore);
  });
  $(".p1.hold").click(function () {
    game.hold(game.player1);
    console.log("P1 Score is now: " + game.player1.score);
    $("#p1Score").text(game.player1.score);
    $(".p1.roll").hide();
    $(".p1.hold").hide();
    $(".p2.roll").show();
    $(".p2.hold").show();
  });
  $(".p2.roll").click(function () {
    var rollResult = game.roll(game.player2);
    if(game.player2.turnVal === 0){
      $(".p2.roll").hide();
      $(".p2.hold").hide();
      $(".p1.roll").show();
      $(".p1.hold").show();
    }
    $("#rollResult").text(rollResult);
    $("#p2Score").text(game.player2.tempScore);
  });
  $(".p2.hold").click(function () {
    game.hold(game.player2);
    console.log("P2 Score is now: " + game.player2.score);
    $("#p2Score").text(game.player2.score);
    $(".p2.roll").hide();
    $(".p2.hold").hide();
    $(".p1.roll").show();
    $(".p1.hold").show();
  });
});
