/** @format */

console.log(a); // undefined
var a = 10; // O(1)
console.log(a);
// hoisting

// console.log(b);
let b = 10; // string -> null undefined ''
const x = true; // ES6

b = b + x;

for (let i = 0; i < 5; i++) {
  // i = 0, i = 1, i = 2, i = 3, i = 4, i = 5
  setTimeout(() => {
    console.log('let i', i);
  }, 100);
}

// 0 -> 4

if (b > 10) {
  //
  b *= 2; //
} else {
  b *= 10;
}
b = b > 10 ? b * 2 : b * 10;

if (b > 10) {
  b *= 2;
} else if (b > 5) {
  b *= 3;
} else if (b > 2) {
  b *= 5;
} else {
  b *= 10;
}

b = b > 10 ? b * 2 : b > 5 ? b * 3 : b > 2 ? b * 5 : b * 10;

const arr = [3, 2, 5, 4, 3, 1, 5]; // O(n)

// break, return, continue
function findNumber(num) {
  const newArr = [];
  let idx = -1; // O(1)
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    if (arr[i] === num) {
      // O(1)
      idx = i; // O(1)
      continue;
      // break;
      // return idx; // stop function
    }

    console.log('i ', i);
    if (arr[i] < num) {
      newArr.push(arr[i]); // [3, 2]
    }
  }

  const val = arr[idx];
  console.log('newArr ', newArr);
  return idx;
}

console.log(findNumber(5));

const obj = {
  '1 545': true,
  key: 0,
  1: 10,
};

const key = obj['1'];

// Challenge 5:
/**
 * const arr = [3, 2, 5, 4, 3, 1, 5];
 * 1. function: find smallest numer
 * @return number
 * function findSmallestNumber(arr) {
 * }
 *
 * 2. filter duplicated number
 * function filterDuplicatedNumber(arr) {
 * 		return [3, 5] // in any order
 * }
 */

function findSmallestNumber(arr) {
  if (!arr || arr.length === 0) return;

  let smallest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }
  return smallest;
}

console.log('Find smallest number');
console.log(findSmallestNumber(arr));
console.log(findSmallestNumber([3]));
console.log(findSmallestNumber([]));
console.log(findSmallestNumber());
