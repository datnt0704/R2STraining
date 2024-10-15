/**
* fibonanci 1 1 2 3 5 8 13 21....
* function getFibN(n) {}
* getFibN(6) -> 8
* getFibN(7) -> 13
* getFibN(40) -> ...
*/

function getFibN(n) {
    if (n <= 1) return 1;
    return getFibN(n - 1) + getFibN(n - 2);
}

function callTime() {
    const startTime = Date.now();
    const res = fn(n);
    console.log(res, Date.now - startTime);
}

callTime(getFibN, 6);
callTime(getFibN, 10);


/**
 * function formatPhoneNumber(phone){}
 * '+84123456789': (+84) 123 456 789 (9/3)
 * '+6512345678': (+65) 1234 5678 (9/2)
 * '+11234567890': (+1) 123 456 7890 (10/3)
 * VN: 84, SG: 65, US: 1
 */

const regionalCode = {
    "+84": "VN",
    "+65": "SG",
    "+1": "US",
    "+353": "Ireland",
};

function formatPhoneNumber(phone) {
    let currentRegionalCode = "";
    let i = 2;

    while (i <= 4) {
        currentRegionalCode = phone.substring(0, i);
        if (regionalCode[currentRegionalCode]) {
            break;
        }
        i++;
    }

    const phoneNumber = phone.substring(i);

    if (phoneNumber.length === 8) {
        return `(${currentRegionalCode}) ${phoneNumber.substring(
            0,
            4
        )} ${phoneNumber.substring(4)}`;
    }

    return `(${currentRegionalCode}) ${phoneNumber.substring(
        0,
        3
    )} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
}

console.log("+84123456789", formatPhoneNumber("+84123456789"));
console.log("+6512345678", formatPhoneNumber("+6512345678"));
console.log("+11234567890", formatPhoneNumber("+11234567890"));



/**
 * products1: [{
 * id: 1,
 * name: 'T shirt',
 * quantity: 10,
 * colors: ['red', 'yellow']
 * }, {
 * id: 2,
 * name: 'Pant',
 * quantity: 11,
 * color: ['black']
 * }]
 *
 * products2: [{
 * id: 1,
 * name: 'T shirt',
 * quantity: 15,
 * colors: ['red', 'yellow', 'white']
 * }, {
 * id: 3,
 * name: 'Sweater',
 * quantity: 12,
 * color: ['brown']
 * }]
 */

// const products1 = [
//   {
//     id: 1,
//     name: "T shirt",
//     quantity: 10,
//     colors: ["red", "yellow"],
//   },
//   {
//     id: 2,
//     name: "Pant",
//     quantity: 11,
//     color: ["black"],
//   },
// ];

// const products2 = [
//   {
//     id: 1,
//     name: "T shirt",
//     quantity: 15,
//     colors: ["red", "yellow", "white"],
//   },
//   {
//     id: 3,
//     name: "Sweater",
//     quantity: 12,
//     color: ["brown"],
//   },
// ];

function mergeProducts(products1, newProducts2) {
    const objProduct2 = {};
    const result = [...newProducts2];
    for (let i = 0; i < newProducts2.length; i++) {
        objProduct2[newProducts2[i]["id"]] = newProducts2[i];
    }

    for (let i = 0; i < products1.length; i++) {
        if (!objProduct2[products1[i]["id"]]) {
            result.push(products1[i]);
        }
    }

    return result;
}

console.log(mergeProducts(products1, products2));

function mergeProducts2(product1, product2) {
    const result = [];
    let i = 1,
        j = 0;
    while (i < product1.length && j <= product2.length) {
        if (product1[i]["id"] >= product2[j]["id"]) {
            result.push(product2[j]);
            if (product1[i]["id"] === product2[j]["id"]) {
                i++;
            }
            j++;
            continue;
        }
        if (product1[i]["id"] < product2[j]["id"]) {
            result.push(product1[i]);
            i++;
            continue;
        }
    }

    if (i < product1.length) {
        result.push(...product1.splice(i));
    }
    if (j < product2.length) {
        result.push(...product2.splice(j));
    }
    return result;
}

console.log(mergeProducts2(products1, products2));

// Challenge 14:
/**
 * 1. merge n array products
 * listProducts: [products, products]
 * function mergeNArrayProducts(listProducts) {
 * }
 */

const products1 = [
    { id: 1, name: "T shirt", quantity: 10, colors: ["red", "yellow"] },
    { id: 2, name: "Pant", quantity: 11, colors: ["black"] },
];

const products2 = [
    { id: 1, name: "T shirt", quantity: 15, colors: ["red", "yellow", "white"] },
    { id: 3, name: "Sweater", quantity: 12, colors: ["brown"] },
];

const products3 = [
    { id: 1, name: "T shirt", quantity: 5, colors: ["blue"] },
    { id: 4, name: "Jacket", quantity: 7, colors: ["green"] },
    { id: 5, name: "Shoes", quantity: 20, colors: ["black", "white"] },
];

const products4 = [
    { id: 2, name: "Pant", quantity: 5, colors: ["gray"] },
    { id: 3, name: "Sweater", quantity: 6, colors: ["blue"] },
    { id: 5, name: "Shoes", quantity: 5, colors: ["black", "red"] },
    { id: 6, name: "Hat", quantity: 8, colors: ["purple"] },
];

const products5 = [
    { id: 1, name: "T shirt", quantity: 20, colors: ["pink"] },
    { id: 4, name: "Jacket", quantity: 10, colors: ["blue", "red"] },
    { id: 5, name: "Shoes", quantity: 3, colors: ["yellow"] },
    { id: 6, name: "Hat", quantity: 12, colors: ["orange", "green"] },
    { id: 7, name: "Socks", quantity: 18, colors: ["gray"] },
];

function mergeNArrayProducts(listProducts) {
    let mergedProducts = listProducts[0];

    for (let i = 1; i < listProducts.length; i++) {
        mergedProducts = mergeTwoArrays(mergedProducts, listProducts[i]);
    }

    mergedProducts.sort((a, b) => a.id - b.id);

    return mergedProducts;
}

function mergeTwoArrays(products1, products2) {
    const objProduct2 = {};
    const result = [...products2];

    for (let i = 0; i < products2.length; i++) {
        objProduct2[products2[i].id] = products2[i];
    }

    for (let i = 0; i < products1.length; i++) {
        if (!objProduct2[products1[i].id]) {
            result.push(products1[i]);
        }
    }

    return result;
}

const mergedProducts = mergeNArrayProducts([products1, products2, products3, products4, products5]);
console.log(mergedProducts);



function mergeNArrayProducts2(listProducts) {
    const result = [...listProducts];
    while (result.length > 1) {
        const temp = [];
        for(let i = 0; i < result.length; i += 2)
        if (i === result.length - 1) {
            result.push(result[i]);
        } else {
            temp.push(mergeProducts2(result[i], result[i + 1]));
        }
        result = [...temp];
    }
    return result[0];
}
console.log("MergeN2: ", mergeNArrayProducts2(allProducts));




//  2. format currency
//  amount: number - 100000
//  return: 1,000,000 10,000
//  function formatCurrency(amount) {}
//  


function formatCurrency(amount) {
    let strAmount = amount.toString();
    let result = "";

    for (let i = strAmount.length - 1; i >= 0; i--) {
        result = strAmount[i] + result;
        if ((strAmount.length - i) % 3 === 0 && i !== 0) {
            result = "," + result;
        }
    }

    return result;
}

console.log(formatCurrency(10000));
console.log(formatCurrency(5035000));
console.log(formatCurrency(100190));
console.log(formatCurrency(123456789));


function formatCurrency2(amount) {
    let formatAmount = "";
    while (amount > 999) {
      const temp = amount % 1000;
      tempFormat =
        temp === 0
          ? ",000"
          : temp < 10
          ? `,00${temp}`
          : temp < 100
          ? `,0${temp}`
          : `,${temp}`;
      formatAmount = tempFormat + formatAmount;
      amount = Math.floor(amount / 1000);
    }
    if (amount > 0) {
      formatAmount = amount + formatAmount;
    }
    return formatAmount;
  }