// var randomstring =
//   Math.random().toString(36).slice(-8).toLowerCase() +
//   Math.random().toString(36).slice(-8).toUpperCase();
// var symBols = "!";

// var randomstring1 = randomstring + symBols;

function generatePassword(passwordLength) {
  var numberChars = "0123456789";
  var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerChars = "abcdefghijklmnopqrstuvwxyz";
  var symBols = "!@#$%^&*()";
  var allChars = numberChars + upperChars + lowerChars + symBols;
  var randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray[3] = symBols;
  randPasswordArray = randPasswordArray.fill(allChars, 4);
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join("");
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
export let emailPwd = generatePassword(8);
// console.log(emailPwd);
