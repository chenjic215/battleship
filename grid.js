
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
exports.displayGrid = (grid) => {

}
