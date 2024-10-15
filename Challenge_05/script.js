const array = [3, 2, 5, 4, 3, 1, 5];

function findSmallestNumber(array) {
  if (!array || array.length === 0) return;
  return Math.min(...array);
}

console.log("Min: ", findSmallestNumber(array));

function filterDuplicatedNumbers(array) {
  const numberCounts = {};
  const duplicatedNumbers = [];
  
  for (let i = 0; i < array.length; i++) {
    const number = array[i];
    if (numberCounts[number]) {
      numberCounts[number]++;
      if (numberCounts[number] === 2) {
        duplicatedNumbers.push(number);
      }
    } else {
      numberCounts[number] = 1;
    }
  }

  return duplicatedNumbers;
}

console.log("Duplicate Number: ", filterDuplicatedNumbers(array));
