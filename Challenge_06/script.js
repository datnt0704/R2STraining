const products = [
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
  
  function calculateTotalQuantity(products) {
    let total = 0;
    const newProductList = [];
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product !== null) {
        total += product.quantity;
        newProductList.push({
          name: product.name,
          quantity: product.quantity,
        });
      }
    }
  
    return { products: newProductList, total };
  }
  
  console.log(calculateTotalQuantity(products));
  
  function insertPopularItem(newProduct) {
    if (!newProduct || newProduct.models.id == null) return;
  
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product && product.models.id === newProduct.models.id) {
        products.splice(i, 1);
        break;
      }
    }
    
    products.unshift(newProduct);
  }
  
  const popularProduct = {
    name: 'Sweatshirt',
    quantity: 30,
    models: {
      size: 28,
      id: 2,
      color: ['gray', 'white'],
    },
  };
  
  insertPopularItem(popularProduct);
  console.log(products);
  