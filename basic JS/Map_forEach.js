// function camelize(str){
//     let newString;

//     if (str[0] === '-'){
//         newString = str.slice(1);
//     } else {
//         newString = str;
//     }

//     const arr = newString.split('-');
//     const arr2 = arr.map((curValue, index) => {
//         if (index === 0){
//             return curValue;
//         }

//         const uppercaseLetter = curValue[0].toUpperCase();
//         const cuttedString = curValue.slice(1);

//         return `${uppercaseLetter}${cuttedString}`;
//     });

//     return arr2.join('');
// }

// console.log(camelize("-background-color-huy-sosi-guboy-triasi"));

/**************************************************************************/

// let vasya = { name: "Вася", age: 25 };
// let petya = { name: "Петя", age: 30 };
// let masha = { name: "Маша", age: 28 };

// let users = [ vasya, petya, masha ];

// let names = users.map((user) => {
//     return user.name;
// })

// console.log(names);


/**************************************************************************/
// let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
// let petya = { name: "Петя", surname: "Иванов", id: 2 };
// let masha = { name: "Маша", surname: "Петрова", id: 3 };

// let users = [ vasya, petya, masha ];
// let usersMapped = users.map((user) => {
//     const obj = {};
//     obj.fullName = `${user.name} ${user.surname}`;
//     obj.id = user.id;
//     return obj;
//     // return ({ fullName:  `${user.name} ${user.surname}`, id: user.id })
// })

/*
usersMapped = [
  { fullName: "Вася Пупкин", id: 1 },
  { fullName: "Петя Иванов", id: 2 },
  { fullName: "Маша Петрова", id: 3 }
]
*/
// console.log(usersMapped);
// console.log(usersMapped[0].id) // 1
// console.log(usersMapped[0].fullName) // Вася Пупкин



/****************************************************************************************************************
 * tasks: https://coursework.vschool.io/array-map-exercises/
 * **************************************************************************************************************/
const ARRAY = [
  {
    name: "Angelina Jolie",
    age: 80
  },
  {
    name: "Eric Jones",
    age: 2
  },
  {
    name: "Paris Hilton",
    age: 5
  },
  {
    name: "Kayne West",
    age: 16
  },
  {
    name: "Bob Ziroll",
    age: 100
  }
];



/* #1 */
function doubleNumbers(arr){
  return arr.map((elem) => !isNaN(Number(elem)) ? elem * 2 : elem);
}

console.log(doubleNumbers([2, 5, '100A', '100'])); //  [4, 10, '100A', 200 ]



/* #2 */
const stringItUp = (arr) => arr.map((elem) => `${elem}`);

console.log(stringItUp([2, 5, 100])); // ["2", "5", "100"]



/* #3 */
function capitalizeNames(arr){
  return arr.map((elem) => `${elem.slice(0, 1).toUpperCase()}${elem.slice(1).toLowerCase()}`);
}

console.log(capitalizeNames(["john", "JACOB", "jinGleHeimer", "schmidt"])); // ["John", "Jacob", "Jingleheimer", "Schmidt"]



/* #4 */
const namesOnly = (arr) => arr.map(({name}) => name);

console.log(namesOnly(ARRAY));
// ["Angelina Jolie", "Eric Jones", "Paris Hilton", "Kayne West", "Bob Ziroll"]



/* #5 */
function makeStrings(arr){
  const staticTextMatrix = 'can go to The Matrix';
  const staticTextMaloletka = 'is under age!!';

  return arr.map(({name, age}) => age <= 50 ? `${name} ${staticTextMaloletka}` : `${name} ${staticTextMatrix}`);
}

console.log(makeStrings(ARRAY));
// ["Angelina Jolie can go to The Matrix",
// "Eric Jones is under age!!",
// "Paris Hilton is under age!!",
// "Kayne West is under age!!",
// "Bob Ziroll can go to The Matrix"]



/* #6 */
const readyToPutInTheDOM = (arr) => arr.map(({name, age}) => `<h1>${name}</h1><h2>${age}</h2>`);

console.log(readyToPutInTheDOM(ARRAY));
// ["<h1>Angelina Jolie</h1><h2>80</h2>",
// "<h1>Eric Jones</h1><h2>2</h2>",
// "<h1>Paris Hilton</h1><h2>5</h2>",
// "<h1>Kayne West</h1><h2>16</h2>",
// "<h1>Bob Ziroll</h1><h2>100</h2>"]