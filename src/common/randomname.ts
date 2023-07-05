function generate(length) {
  var chars = "asdfghjklzxcvbnmqwertyuiop",
    result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
export var randomFirstName = generate(5);
export var randomLastName = generate(4);
// console.log(randomFirstName);
// console.log(randomLastName);
