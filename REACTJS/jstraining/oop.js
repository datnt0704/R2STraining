/** @format */

// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

function Person(name) {
  console.log('this ', this);
  this.name = name;
}

const nhan = new Person('Nhan');
const thanh = new Person('Thanh');

console.log('nhan ', nhan);
console.log('thanh ', thanh);

// function Product(name, quantity) {
//   this.name = name;
//   this.quantity = quantity;
//   this.models = {};
// }

// this normal function: depends on place where is called
// arrow function: inherit enclose place

// Product.prototype.setModel = (size, colors) => {
//   console.log('this product ', this);
//   this.models.id = Date.now();
//   this.models.size = size;
//   this.models.colors = colors;
// };

// OOP
class Product2 {
  static showModel() {
    console.log('this static ', this);
  }

  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.models = {};
  }

  setModel() {
    this.models.id = Date.now();
    this.models.size = size;
    this.models.colors = colors;
  }
}

Product2.showModel();

const product1 = new Product('Tshirt', 20);
// product1.setModel(20, ['red', 'black']);

function X() {
  this.models = {};
  console.log('this @@@ ', this);
  // product1.setModel(20, ['red', 'black']);
}

const newX = new X();

const products = [
  product1,
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

// { name, qunatity, models }
Array.prototype.filterProduct = function () {
  const arr = this;
  const data = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      data.push({
        name: arr[i].name,
        quantity: arr[i].quantity,
      });
    }
  }
  return data;
};
console.log('products ', products);

console.log(products.filterProduct());

const emptyArr = [];

const obj = {
  name: 'Tai',
  getName: function () {
    console.log('this obj ', this);
    const testFn = () => {
      console.log('this in test ', this);
    };
    testFn();
    return this.name;
  },
};
obj.getName();
console.log('obj ', obj);
console.log('empty ', emptyArr);

//
function Student(fullname, dateOfBirth) {
  this.fullname = fullname; // Le Viet Thanh
  this.dateOfBirth = dateOfBirth; // 29/2/2008
}

Student.prototype.getFirstName = function () {
  return this.fullname.split(' ').pop();
}; // Thanh
Student.prototype.getAge = function () {
  const year = Number(this.dateOfBirth.split('/').pop());
  return new Date().getFullYear() - year;
}; // 16

const trainer = new Student('Truong Hoai', '29/2/2008');
console.log(trainer.getFirstName());
console.log(trainer.getAge());

function SortedArray() {
  this.numbers = [];
}

SortedArray.prototype.initNumbers = function (arr) { }; // set arr to this.numbers
SortedArray.prototype.get = function (num) { }; // return index of num
SortedArray.prototype.set = function (num) { }; // correct order in arr
SortedArray.prototype.remove = function (num) { }; // remove num in arr

// challenge 7
/**
  function SortedArray() {
    this.numbers = [];
  }
  SortedArray.prototype.initNumbers = function (arr) {}; // set arr to this.numbers
  SortedArray.prototype.get = function (num) {}; // return index of num
  SortedArray.prototype.set = function (num) {} // correct order in arr
  SortedArray.prototype.remove = function(num){} // remove num in arr
 *
 */


