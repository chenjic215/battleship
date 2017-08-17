
var grid = require("./grid");

const GRIDSIZE = 10; //To-DO: let user define the size of the board

var ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const SHIPINFO = {
  "Carrier" : 5,
  "Battleship": 4,
  "Cruiser": 3,
  "Submarine": 3,
  "Destroyer": 2,
};

//constructor
exports.createPlayer = function(playerType, playerName, playerShips, positionDict, oceanGrid) {

  console.log("Creating players...");
  this.playerType = playerType;
  this.playerName = playerName;
  this.playerShips = playerShips;
  this.positionDict = positionDict;
  //this.totalPartLeft =  5 + 4 + 3 + 3 + 2;
  this.totalPartLeft =  5;
  console.log("Generating Target Grids...");
  this.targetGrid = grid.createEmptyGrid(GRIDSIZE);
  console.log("Generating Ocean Grids...");
  this.oceanGrid = oceanGrid;
  this.getInfo = () => {
    var info = {
      playerName : this.playerName,
      playerType : this.playerType,
      playerShips: this.playerShips,
      //positionDict: this.positionDict,
      targetGrid : this.targetGrid,
      oceanGrid : this.oceanGrid,
    };
    return info;
  };
};

exports.enterPlayerName = (rl, callback) => {

  rl.resume();
  rl.question("\nEnter player name: ", (answer) => {
    rl.pause();
    return callback(answer);
  });
};

exports.enterInitalShipPositions = (rl, callback) => {

  console.log("Enter the position of the ships by specifying starting position and direction:");
  console.log("Note: 1. Ship should be placed inside the 10x10 grid");
  console.log("      2. Ship is not allow to overlapped (share grid point) with other ships");
  console.log("      2. Position X start with A-J, Position Y start with 0-9");
  console.log("example#1: To place ship Horizontally starting at A3. User should enter: A3H");
  console.log("example#2: To place ship Vertically starting at B5. User should enter: B3H");

  var oceanGrid = grid.createEmptyGrid(GRIDSIZE);
  var playerShips = {};
  var positionDict = {};
  exports.enterPosition(rl, "Carrier", playerShips, positionDict, oceanGrid, (playerShips, positionDict, oceanGrid)=> {
    console.log(playerShips);
    console.log(oceanGrid);

    // exports.enterPosition(rl, "Battleship", playerShips, oceanGrid, (playerShips, oceanGrid)=> {
    //   console.log(playerShips);
    //   console.log(oceanGrid);
    //
    //   exports.enterPosition(rl, "Cruiser", playerShips, oceanGrid, (playerShips, oceanGrid)=> {
    //     console.log(playerShips);
    //     console.log(oceanGrid);
    //
    //     exports.enterPosition(rl, "Submarine", playerShips, oceanGrid, (playerShips, oceanGrid)=> {
    //       console.log(playerShips);
    //       console.log(oceanGrid);
    //
    //       exports.enterPosition(rl, "Destroyer", playerShips, oceanGrid, (playerShips, oceanGrid)=> {
    //         console.log(playerShips);
    //         console.log(oceanGrid);

            return callback(playerShips, positionDict, oceanGrid);

    //       });
    //
    //     });
    //
    //   });
    //
    // });

  });
};

function isLetter(s) {
  if (s.match("^[a-zA-Z\(\)]+$")) {
    return true;
  }
  return false;
};

function isDirection(s) {
  if (s == "H" || s == "V") {
    return true;
  }

  return false;
}


exports.enterPosition = (rl, shipName, playerShips, positionDict, oceanGrid, callback) => {
  rl.resume();

  rl.question("\nPlease enter the position for " + shipName + " (" + SHIPINFO[shipName]+ " spaces):", (answer) => {

    if (answer.length ==3) {
      var a =  answer[0].toUpperCase();
      var b =  answer[1];
      var c =  answer[2].toUpperCase();

      //validate the position
      if (isLetter(a) && !(isNaN(b)) && isLetter(c) && isDirection(c)) {

        //check if the ship go over the board
        var x = grid.letterToNumber(a);
        var y = Number(b);

        var spaceNeeded = [];
        var overlap = false; //check if the ship position overlap with other ships
        var goOverGrid = false; //check if the ship positioned outside the grid

        if (c == "V") {
          for (var i=0; i<SHIPINFO[shipName];i++) {
            var currentX = x+i;

            if (currentX < 10) {
              if (oceanGrid[currentX][y] == 1) {
                overlap =  true;
              }
            } else {
              goOverGrid = true
            }
            spaceNeeded.push([currentX, y]);
          }
        } else {
          for (var i=0; i<SHIPINFO[shipName];i++) {
            var currentY = y+i;

            if (currentY < 10) {
              if (oceanGrid[x][currentY] == 1) {
                overlap =  true;
              }
            } else {
              goOverGrid = true
            }
            spaceNeeded.push([x, currentY]);
          }
        }

        //check if ship is outside of the grid or overlap with other ships
        if (!overlap && !goOverGrid) {

          //update oceanGrid AND add position to positionDict
          for (var i=0; i< spaceNeeded.length;i++) {
            oceanGrid[spaceNeeded[i][0]][spaceNeeded[i][1]] = 1;

            var coordinate = ALPHABET[spaceNeeded[i][0]] + spaceNeeded[i][1].toString();
            positionDict[coordinate] =  {
              shipName : shipName,
              status : 0,
              order: i,
              numericalPosition: spaceNeeded[i]
            };
          }

          // var status = [];
          // for (var i=0;i<SHIPINFO[shipName];i++) {
          //   status.push(1);
          // }
          playerShips[shipName] = {
            position : spaceNeeded,
            // status : status, // 1 represent not been hit. 0 represent this part has been hit.
            size: SHIPINFO[shipName],
            partsLeft: SHIPINFO[shipName]
          };
          rl.pause();
          return callback(playerShips, positionDict, oceanGrid);

        } else {
          //invalid input: ship go over the board.
          if (overlap) {
            console.log("Error: Ship must not overlap (share grids) with other ships. Please re-enter a starting position.");
          } else {
            console.log("Error: Ship must be placed inside the grid. Please re-enter a starting position.");
          }

          exports.enterPosition(rl, shipName, playerShips, positionDict, oceanGrid, (playerShips, positionDict, oceanGrid)=> {

            rl.pause();
            return callback(playerShips, positionDict, oceanGrid);

          } );
        }

      } else {
          //invalid input, re-enter the position
          console.log("Error: Please enter required position format as shown above.");
          exports.enterPosition(rl, shipName, playerShips, positionDict, oceanGrid, (playerShips, positionDict, oceanGrid)=> {

            rl.pause();
            return callback(playerShips, positionDict, oceanGrid);

          } );
      }

    } else {
      //invalid input, re-enter the position
      console.log("Error: Please enter required position format as shown above.");
      exports.enterPosition(rl, shipName, playerShips, positionDict, oceanGrid, (playerShips, positionDict, oceanGrid)=> {

        rl.pause();
        return callback(playerShips, positionDict, oceanGrid);

      } );

    }
  });
}

exports.attack = (rl, attacker, defender, callback) => {
  rl.resume();
  rl.question("\n"+ attacker.playerName+" : I would like to attack on coordinates: ", (answer) => {

    //validate user input
    if (answer.length ==2) {
      var a =  answer[0].toUpperCase();
      var b =  answer[1];

      //validate the input type
      if (isLetter(a) && !(isNaN(b))) {
        //check if the coordinate is valid point on the grid
        var x = grid.letterToNumber(a);
        var y = Number(b);
        if (x< 10 && y< 10) {

          //TO-DO: check if this position has alreayd been attacked.

          //check the attack result

          if (defender.oceanGrid[x][y] == 0) {
            //it is a miss
            console.log(defender.playerName+": Hahaha, you missed it! (Missed)");

            //attacker mark a miss on its targetGrid
            attacker.targetGrid[x][y] = "M";

            //current attacker and defender switch role for next round
            exports.attack(rl, defender, attacker, (result) => {

              rl.pause();
              return callback(result);
            })

          } else {
            // it is a hit

            attacker.targetGrid[x][y] = "H";
            defender.oceanGrid[x][y] = "H";

            var shipName = defender.positionDict[answer.toUpperCase()].shipName;
            defender.playerShips[shipName].partsLeft = defender.playerShips[shipName].partsLeft - 1;
            defender.totalPartLeft = defender.totalPartLeft - 1;

            //check if any ship sunk
            if (defender.playerShips[shipName].partsLeft == 0) {
              console.log(defender.playerName+": OMG, My "+ shipName+ " ship just sunk! (Sunk)");
            } else {
              console.log(defender.playerName+": Ugh, its a hit! (Hit)");
            }

            //check if all ship sunk
            if (defender.totalPartLeft == 0) {
              console.log(defender.playerName+": You win!, all my ships were sunk! (GameOver)");
              var result =  {
                winner : attacker.playerName
              }

              rl.pause();
              return callback(result);
            } else {
              //current attacker and defender switch role for next round
              exports.attack(rl, defender, attacker, (result) => {

                rl.pause();
                return callback(result);
              })
            }
          }


        } else {
          //re-enter due to invalid user input
          console.log("Error: Please enter required coordinate format as shown above.");
          exports.attack(rl, attacker, defender, (result) => {

            rl.pause();
            return callback(result);
          })

        }
      } else {
        //re-enter due to invalid user input
        console.log("Error: Please enter required coordinate format as shown above.");
        exports.attack(rl, attacker, defender, (result) => {

          rl.pause();
          return callback(result);
        })


      }

    } else {
        //re-enter due to invalid user input
        console.log("Error: Please enter required coordinate format as shown above.");
        exports.attack(rl, attacker, defender, (result) => {

          rl.pause();
          return callback(result);
        })
    }
  });
}
