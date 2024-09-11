export interface Product {
	name: string;
	quantity: number;
	models?: {
		size: number;
		colors: Array<string>;
		id: number
	};
	getName: () => string;
}



const product: Product = {
	name: 'Tshirt',
	quantity: 20,
	models: {
		size: 20,
		colors: ['red', 'black'],
		id: 1
	},
	getName: function() {
		return ''
	}
}

class Pant implements Product {
	name: string; 
	quantity: number;

	constructor(name: string, quantity: number) {
		this.name = name;
		this.quantity = quantity
	}

	getName() {
		return this.name
	}
}

interface Food {
	expired: Date;
}

interface Shop<T> {
	name: string;
	type: string;
	verified: boolean;
	products: Array<T>
}

interface Mall extends Shop<Food> {
	brand: string;
}

interface Preferred extends Shop {
	followers: number;
	minOrders: number;
}

type NormalShop = Shop & {
	address: string;
	upgradeToMall: () => void
}

type Age = number 
interface Age2 {
	year: number
}

const MAIL_TYPE = {
	READ: 1,
	STAR: 2,
	IMPORTANT: 3
}

enum MAIL_OF_TYPE {
	READ = 1,
	STAR = 2,
	IMPORTANT = 3,
}