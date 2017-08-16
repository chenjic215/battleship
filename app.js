var game = require("./game");

const GAMEMODE = {
  "1" : "Machine to Machine (Viewer Mode)",
  "2" : "Man to Machine"
};

var mode = "";
game.printWelcomeMessage();

game.selectMode((userSelected) => {
  console.log("Game starting with '"+ GAMEMODE[userSelected] + "' mode...");

});
