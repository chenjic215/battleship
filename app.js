var game = require("./game");
var grid = require("./grid");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const GAMEMODE = {
  "1" : "Human vs Human",
  "2" : "Human to Machine",
  "3" : "Machine to Machine (Viewer)"
};

var mode = "";
game.printWelcomeMessage();

game.selectMode(rl, (userSelected) => {
  console.log("Game starting with '"+ GAMEMODE[userSelected] + "' mode...");

  if (userSelected == 1) {
    //user take turn to create their profile:
    //1. Enter PlayerName
    //2. Place their ship (select starting point, ship type and direction)

    game.createProfile(rl, (player1, player2) => {

      console.log(player1.getInfo());
      console.log(player2.getInfo());

      console.log("\nPlayers have created their profile...");
      console.log("Players have placed their ships...");
      console.log("Starting the game...");

      console.log("\nNote: Attacker must input (x,y) coordinates.");
      console.log("      1. x is a letter between A-J. y is a number between 0-9.");
      console.log("      2. sample coordinates: A1, B9, F1, etc.");

      console.log("\nGame starts now!!");

      //var gamePlayLog =
      game.play(rl, player1, player2, (result) => {
        console.log("\nCongratulations "+result.winner+" ! You have won the game!!");
        console.log("Congratulations "+result.winner+" ! You have won the game!!");
        console.log("Congratulations "+result.winner+" ! You have won the game!!\n");
      });
    });

  } else if (userSelected == 2) {

  } else {

  }





});
