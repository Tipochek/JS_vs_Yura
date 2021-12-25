/* #1 */

let arr1 = [5, 2, 1, -10, 8];
arr1.sort((a, b) => b - a);

console.log( arr1 ); // 8, 5, 2, 1, -10



/* #2 */
const copySorted = (arr) => [...arr].sort();

let arr2 = ["HTML", "JavaScript", "CSS"];
let sorted = copySorted(arr2);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( arr2 ); // HTML, JavaScript, CSS (без изменений)



/* #3 */
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr3 = [ vasya, petya, masha ];

sortByAge(arr3);
function sortByAge(arr) {
  // const a = arr.map(({name,age}) => ({[age]: name}));
  // const b = arr.map(({age}) => age);
  // b.sort();

  // console.log(a);
  // console.log(b);

  arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

// теперь: [vasya, masha, petya]
console.log(arr3[0].name); // Вася
console.log(arr3[1].name); // Маша
console.log(arr3[2].name); // Петя


/*
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [ vasya, petya, masha ];
console.log(arr);
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
arr.sort(function(a, b) {
  console.log( a.age + " < = > " + b.age );
  return a.age > b.age ? 1 : -1;
});
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log(arr);
*/



/* ************************************************************************

                  ***  ARRAY REDUCE EXERCISES  ***

************************************************************************* */

// 1) Turn an array of numbers into a total of all the numbers

function total(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

console.log(total([1,2,3,4,5])); // 15



// 2) Turn an array of numbers into a long string of all those numbers.

function stringConcat(arr) {
  return arr.reduce((prev, curr) => `${prev}${curr}`, '');
}

console.log(stringConcat([1,2,3])); // "123"



// 3) Turn an array of voter objects into a count of how many people voted
function totalVotes(arr) {
  return arr.reduce((prev, {voted}) => voted ? prev + 1 : prev, 0);
}

var voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];

console.log(totalVotes(voters)); // 7



// 4) Given an array of all your wishlist items, figure out how much it would cost to just buy everything at once
function shoppingSpree(arr) {
  return arr.reduce((prev, {price}) => {
    if (!isNaN(Number(price))) {
      return prev + price;
    }
  }, 0);
}

var wishlist = [
    { title: "Tesla Model S", price: 90000 },
    { title: "4 carat diamond ring", price: 45000 },
    { title: "Fancy hacky Sack", price: 5 },
    { title: "Gold fidgit spinner", price: 2000 },
    { title: "A second Tesla Model S", price: 90000 }
];

console.log(shoppingSpree(wishlist)); // 227005



// 5) Given an array of arrays, flatten them into a single array
function flatten(arr) {
  return arr.flat();
  return arr.reduce((prev, curr) => [...prev, ...curr], []);
  return arr.reduce((prev, curr) => prev.concat(curr), []);
}

var arrays = [
    ["1", "2", "3"],
    [true],
    [4, 5, 6]
];

console.log(flatten(arrays)); // ["1", "2", "3", true, 4, 5, 6];



/*6) Given an array of potential voters, return an object representing the results of the vote
Include how many of the potential voters were in the ages 18-25, how many from 26-35, how many
from 36-55, and how many of each of those age ranges actually voted. The resulting object
containing this data should have 6 properties. See the example output at the bottom.*/

var voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];

function voterResults(arr) {
  const numYoungVotes = 0;
  const numYoungPeople = 0;
  const numMidVotesPeople = 0;
  const numMidsPeople = 0;
  const numOldVotesPeople = 0;
  const numOldsPeople = 0;

  const obj = {
    numYoungVotes,
    numYoungPeople,
    numMidVotesPeople,
    numMidsPeople,
    numOldVotesPeople,
    numOldsPeople
  }

  const result = arr.reduce((obj, {age , voted}) => {
    if (age <= 25) {
      obj.numYoungPeople += 1;
      obj.numYoungVotes = voted ? obj.numYoungVotes + 1 : obj.numYoungVotes;
    } else if (age <= 35) {
      obj.numMidsPeople += 1;
      obj.numMidVotesPeople = voted ? obj.numMidVotesPeople + 1 : obj.numMidVotesPeople;
    } else if (age <= 55) {
      obj.numOldsPeople += 1;
      obj.numOldVotesPeople = voted ? obj.numOldVotesPeople + 1 : obj.numOldVotesPeople;
    }

    return obj;

  }, obj);

  return result;
}

console.log(voterResults(voters)); // Returned value shown below:
/*
{ numYoungVotes: 1,
  numYoungPeople: 4,
  numMidVotesPeople: 3,
  numMidsPeople: 4,
  numOldVotesPeople: 3,
  numOldsPeople: 4
}
*/