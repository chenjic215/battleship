
var ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

exports.createEmptyGrid = (size) => {
  //var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var grid = [];

  if (size > 26) {
    console.log("The maximum grid allowed is 26 x 26");
  } else {

    //generate an empty grid
    for (var i = 0; i< size; i++){
      var row = [];
      for (var a = 0; a< size; a++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  }
}

exports.letterToNumber = (s) => {
  return ALPHABET.indexOf(s);
}

//display the grid better in terminal
exports.displayGrid = (grid, gridName) => {

  var title = "";
  for(var i=0; i<Math.floor((25 - gridName.length)/2); i++) {
    title = title + " ";
  }
  title = title + gridName;
  console.log("\n"+title);

  var letters = ["A","B","C","D","E","F","G","H","I","J"];
  console.log("    0 1 2 3 4 5 6 7 8 9  ");
  console.log("    - - - - - - - - - -  ");
  for (var i=0; i<letters.length; i++) {
    var string = letters[i]+" | ";
    for (var a=0;a<10;a++) {
      string = string + grid[i][a] + " ";
    }
    string = string + "|";
    console.log(string);
  }
  console.log("    - - - - - - - - - -  ");
}
