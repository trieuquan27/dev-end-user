export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    // var intlCode = match[1] ? "+2 " : "";
    return ["(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return "";
}

// var phone = formatPhoneNumber(18888888888);
// console.log(phone);
