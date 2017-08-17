var player = require("./player");

const GAMEMODE = {
  "1" : "Human vs Human",
  "2" : "Human to Machine",
  "3" : "Machine to Machine (Viewer)"
};

const SHIPINFO = {
  "Carrier" : 5,
  "Battleship": 4,
  "Cruiser": 3,
  "Submarine": 3,
  "Destroyer": 2,
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
    console.log(" 3. "+ GAMEMODE[3]);
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
exports.selectMode = (rl, callback) => {

  rl.question("\nSelect game mode: ", (answer) => {

    //handler for bad user input
    if (answer == "1") {
      console.log(`\nUser have selected: ${answer}`);
      rl.pause();
      return callback(answer);

    } else if (answer == "2"  || answer == "3"){
      console.log("Mode #2 and #3 are not availble for now. Please re-select!");
      exports.selectMode(rl, (selected)=> {
        return callback(selected);
      });

    } else {
      //recurrrance until the right user input
      console.log("\nPlease enter only '1' or '2' !!");
      exports.selectMode(rl, (selected)=> {
        return callback(selected);
      });
    }
  });
};

exports.createProfile = (rl, callback) => {
  //Player #1 - createProfile
  player.enterPlayerName(rl, (name) => {
    //Player #1 - place your ship and generate ocean grid
    player.enterInitalShipPositions(rl, (playerShips, positionDict, oceanGrid)=> {
      var player1 = new player.createPlayer("Human", name, playerShips, positionDict, oceanGrid);

      //Player #2 - createProfile
      player.enterPlayerName(rl, (name) => {
        //Player #2 - place your ship and generate ocean grid
        player.enterInitalShipPositions(rl, (playerShips, positionDict, oceanGrid)=> {
          var player2 = new player.createPlayer("Human", name, playerShips, positionDict, oceanGrid);

          return callback(player1, player2);

        });
      });
    });
  });
};

exports.play = (rl, player1, player2, gameLog, callback) => {

  player.attack(rl, player1, player2, gameLog, (gameLog)=> {

    return callback(gameLog);
  });


}
