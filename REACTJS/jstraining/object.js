/** @format */

import { Product as ProductModel } from './types';

const arr = [19, 9, 3, 4];

// let i = 0;
// //
// while (i < arr.length) {
//   // true
//   // i++
// }

// do {
//   // h
// } while (i < arr.length);

//
const obj = {
  19: 1,
  9: 2,
  3: 1,
};

const keys = Object.keys(obj); // array [3, 9, 19]
const values = Object.values(obj);

const res = [];
for (key in keys) {
  if (obj[key] > 1) {
    res.push(key);
  }
}

// O(n + n) O(2n) ~ O(n)

const marks = [
  {
    name: 'Tom',
    mark: 8,
  },
  // null,
  {
    name: 'Jerry',
    mark: 7,
  },
  {
    name: 'Blue',
    mark: 3,
  },
  {
    name: 'Disney',
    mark: 9,
  },
  {
    name: 'Dusk',
    mark: 2,
  },
];
// total marks
// 8 + 7 + 3 + 9 + 2 = 29

const validMarks = marks.filter((item) => item?.mark > 5); // O(n) // new array
const validNames = validMarks.map((item) => item?.name); // O(n) // new array

// reduce
const output = marks.reduce((prev = [], item) => {
  if (item?.mark > 5) {
    prev.push(item.name); // ['Tom', 'Jerry', 'Disney']
  }
  return prev;
}, []);

console.log('output ', output);

const totalMarks = marks.reduce((sum, student) => {
  if (student) {
    sum += student.mark;
  }
  return sum;
}, 0);

console.log(totalMarks);

// push
marks.push({ name: 'test', mark: 1 });
const lastItem = marks.pop();
const lastItem2 = marks[marks.length - 1];
marks.unshift({ name: 'Fist', mark: 3 });
console.log('first item ', marks[0]);

console.log('validNames ', validNames);
console.log('marks ', marks);

const names = [];
for (let i = 0; i < marks.length; i++) {
  if (!marks[i]) continue;
  if (marks[i].mark > 5) {
    names.push(marks[i].name);
    // return marks[i];
  }
}

console.log('names ', names);

// filter mark > 5
// ['Tom', 'Jerry', 'Disney']

marks.find((item) => item?.mark > 5); // type of item
marks.findIndex((item) => item?.mark === 10); // number -1

const marksGreater5 = [];
marks.forEach((item) => {
  // O(n)
  if (item?.mark > 5) {
    return item;
    // marksGreater5.push(item.name);
  }
});

const newArr = [1, 3, 5, 6, 2, 4];
marks.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}); // O(nlogn)
console.log('marks ', marks);
console.log('newArr ', newArr);

// newArr.reverse();

// slice, splice
const first3Items = newArr.slice(0, 3);
newArr.splice(2, 3);
console.log('first3Items ', first3Items);
console.log('newArr ', newArr);

// function:
// input: errorcode: 999 -> unknown
// 10002: Product is not shipped
// 10003: Product returned
// 10004: shipping is not recognized

function getErrMessage(errorcode) {
  switch (errorcode) {
    case 999:
      return 'unknown';
    case 10002:
      return 'Product is not shipped';
    case 10003:
      return 'Product returned';
    case 10004:
      return 'shipping is not recognized';
    default:
      return '';
  }
}

const errorMessages = {
  999: 'unknown',
  10002: 'Product is not shipped',
  10003: 'Product returned',
  10004: 'shipping is not recognized',
};

function getErrMessage2(errorcode) {
  return errorMessages[errorcode] || '';
}

const products: Array<Product> = [
  {
    name: 'Tshirt',
    quantity: 20,
    models: {
      size: 20,
      id: 1,
      color: ['red', 'black'],
    },
  },
  null,
  {
    name: 'Pant',
    quantity: 19,
    models: {
      size: 26,
      id: 2,
      color: ['black', 'white'],
    },
  },
  {
    name: 'Long sleeve',
    quantity: 50,
    models: {
      size: 23,
      id: 4,
      color: ['green', 'yellow'],
    },
  },
];

// [{ name: 'Tshirt', size: 20 }, { name: 'Pant', size: 26 }]
function filterProductByColor(prods, color) {
  return prods.reduce((prev, item) => {
    // O(n)
    const colors = item?.models?.color || [];
    // const isColorExisting = colors.findIndex((c) => c === color) >= 0; // m
    const isColorExisting = colors.some((c) => c === color);
    if (isColorExisting) {
      prev.push({
        name: item.name,
        size: item?.models.size,
      });
    }
    return prev;
  }, []); // O(n x m)
}

console.log('items ', filterProductByColor(products, 'black'));

// Challenge 6:
/**
 * 1. Calculate total quantity
 * output: { products: [{ name: 'Tshirt', quantity: 20}, {...}], total: 89 }
 *
 * 2. insert the most popular item
 * input: modelId: 2
 * output: remove product containing modelId, insert the product into the first list
 * function insertPopularItem(modelId) {
 * }
 */

export function insertPopularItem(products, newProduct) {
  if (!newProduct || newProduct.models.id == null) {
    return products;
  }
  const newModelId = newProduct.models.id;
  // const updateProducts = products.reduce((prev, item) => {
  //   if (item !== null && item.models.id === newModelId) {
  //     return prev;
  //   } else {
  //     prev.push(item);
  //     return prev;
  //   }
  // }, []);
  const updateProducts = products.filter(
    (item) => item?.models?.id !== newModelId
  ); // O(n)

  updateProducts.unshift(newProduct);
  return updateProducts;
}
export default filterProductByColor;
