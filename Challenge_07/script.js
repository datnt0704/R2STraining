function SortedArray() {
    this.numbers = [];
  }
  
  SortedArray.prototype.initNumbers = function(arr) {
    this.numbers = arr.slice().sort((a, b) => a - b);
  };
  
  SortedArray.prototype.get = function(num) {
    return this.numbers.indexOf(num);
  };
  
  SortedArray.prototype.set = function(num) {
    let index = this.numbers.findIndex(x => x >= num);
    if (index === -1) {
      this.numbers.push(num);
    } else {
      this.numbers.splice(index, 0, num);
    }
  };
  
  SortedArray.prototype.remove = function(num) {
    const index = this.numbers.indexOf(num);
    if (index !== -1) {
      this.numbers.splice(index, 1);
    }
  }
  
  const sortedArray = new SortedArray();
  
  sortedArray.initNumbers([12, 7, 5, 10, 3]);
  console.log(sortedArray.numbers); 
  
  let index = sortedArray.get(10);
  console.log(index); 
  
  sortedArray.set(6);
  console.log(sortedArray.numbers);
  
  sortedArray.set(15);
  console.log(sortedArray.numbers);
  
  sortedArray.remove(7);
  console.log(sortedArray.numbers); 
  
  sortedArray.remove(20);
  console.log(sortedArray.numbers);
  