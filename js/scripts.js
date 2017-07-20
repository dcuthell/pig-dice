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
  var newRolls = 0;
  for(i=0; i < this.dice.length; i++){
    this.dice[i].roll();
    rollResults.push(this.dice[i].lastRoll);
    newRolls += this.dice[i].lastRoll;
  }
  if(this.dice.length === 1 && this.dice[0].lastRoll === 1){
    player.tempScore = player.score;
    player.turnVal = 0;
    console.log(rollResults);
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
      player.turnVal = 0;
      console.log(rollResults);
      return rollResults;
    }
    for(i=0; i < this.dice.length; i++){
      if(this.dice[i].lastRoll === 1){
        player.tempScore = player.score;
        player.turnVal = 0;
        console.log(rollResults);
        return rollResults;
      }
    }
  }
  console.log(rollResults);
  player.tempScore += newRolls;
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
    this.lastRoll = 1;
  }else{
    this.lastRoll = num;
  }
  return num;
}

Player.prototype.setScore = function(val){
  this.score += val;
}

Game.prototype.smartComp = function(){
  if((this.player2.tempScore - this.player2.score) <= 20){
    return 1;
  }else{
    return 0;
  }
  return 6;
}

//UI
function startComp(game){
  $(".p2").hide();
  while (game.player2.turnVal === 1) {
    var smart = game.smartComp();
    if(smart === 1){
      $("#rollResult").text(game.roll(game.player2));
      if(game.player2.turnVal === 0){
        $(".p2").hide();
        $(".p1").show();
      }
      $("#p2Score").text(game.player2.tempScore);
    }else if(smart === 0){
      game.hold(game.player2);
      $("#p2Score").text(game.player2.score);
      $(".p2").hide();
      $(".p1").show();
    }
  }
}

$(document).ready(function(){
  var game = new Game();

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
    $("#rollResult").text(game.roll(game.player1));
    if(game.player1.turnVal === 0){
      $(".p1").hide();
      $(".p2").show();
      game.player2.turnVal = 1;
      startComp(game);
    }
    $("#p1Score").text(game.player1.tempScore);
  });

  $(".p1.hold").click(function () {
    game.hold(game.player1);
    $("#p1Score").text(game.player1.score);
    $(".p1").hide();
    $(".p2").show();
    game.player2.turnVal = 1;
    startComp(game);
  });

  $(".p2.roll").click(function () {
    $("#rollResult").text(game.roll(game.player2));
    if(game.player2.turnVal === 0){
      $(".p2").hide();
      $(".p1").show();
    }
    $("#p2Score").text(game.player2.tempScore);
  });

  $(".p2.hold").click(function () {
    game.hold(game.player2);
    $("#p2Score").text(game.player2.score);
    $(".p2").hide();
    $(".p1").show();
  });
});
