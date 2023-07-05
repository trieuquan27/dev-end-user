// var a = Math.round(Math.random() * 10);
// // var b = Math.floor(Math.random() * 10);
// // var c = Math.floor(Math.random() * 10);

function generate(length) {
  var chars = "0123456789",
    result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
export var randomCVV = generate(3);
// console.log(randomCVV);
