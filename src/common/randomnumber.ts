function generate(length) {
  var chars = "0123456789",
    result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
export var randomCVV = generate(3);
export var randomZipCode = generate(4);
// console.log(randomCVV);
export var randomNum = generate(5);
