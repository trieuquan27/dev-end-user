// function randomdate(date1, date2) {
//   function randomValueBetween(min, max) {
//     return Math.random() * (max - min) + min;
//   }
//   var date1 = date1 || "";
//   var date2 = date2 || new Date().toLocaleDateString();
//   date1 = new Date(date1).getTime();
//   date2 = new Date(date2).getTime();
//   if (date1 > date2) {
//     return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
//   } else {
//     return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
//   }
// }
// let d = randomdate("2024", "2045");
// let randomDate2 = d;
// console.log(randomDate2);

function randomDate() {}
const d = new Date();
let date = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();
let toDay = ` ${month}` + "/" + `${year}`;
console.log(toDay);
