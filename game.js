const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const GAMEMODE = {
  "1" : "Machine to Machine (Viewer Mode)",
  "2" : "Man to Machine"
};

//print welcome msg and general guidelines
exports.printWelcomeMessage = () => {
    var msgList = [
      "Welcome to the battleship game. Here are general guidelines for the game:",
      "",
      "Objectives:",
      " ● To sink all of the other player's before they sink all of your ships.",
      "",
      "Game Play: ",
      " ● Each player has 5 ships: Carrier (5 spaces), Battleship (4),",
      "   Cruiser (3), Submarine (3), and Destroyer (2).",
      " ● The ships can only be placed vertically or horizontally",
      "",
      "Outcome of actions:",
      " ● ‘Hit’ if the opponent has a ship covering the position",
      " ● ‘Miss’ if there is no ship covering the position",
      " ● ‘Already Taken’ if the position has previously been attacked",
      " ● ‘Sunk’ if all the positions a ship covers have been hit",
      " ● ‘Win’ if all the ships on the opponent's grid have been sunk"
    ];
    console.log("\n\n -------------------------------------------------------------------------------");

    msgList.forEach(function(msg) {
      exports.formatMessage(msg, (formattedMsg) => {
        console.log(formattedMsg);
      })
    })
    console.log(" -------------------------------------------------------------------------------");

    console.log("Please select one of the following game mode:");
    console.log(" 1. "+ GAMEMODE[1]);
    console.log(" 2. "+ GAMEMODE[2]);
  };

//format headline messages
exports.formatMessage = (msg, callback) => {
    msg = "| " + msg;
    for(var i=msg.length;i<80;i++) {
      msg = msg + " ";
    }
    msg = msg + "|";
    return callback(msg);
  };

//select game mode
exports.selectMode = (callback) => {

  rl.question("\nSelect game mode: ", (answer) => {

    if (answer == "1" || answer == "2") {
      console.log(`\nUser have selected: ${answer}`);
      rl.close();
      return callback(answer);

    } else {
      //recurrrance until the right user input
      console.log("\nPlease enter only '1' or '2' !!");
      exports.selectMode((selected)=> {
        return callback(selected);
      });
    }
  });
};
