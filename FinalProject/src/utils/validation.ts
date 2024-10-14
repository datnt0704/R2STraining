export type Errors = {
	username?: string;
	password?: string;
  };
  
  export const validateLoginForm = (username?: string, password?: string): Errors => {
	const errors: Errors = {};
  
	if (!username) {
	  errors.username = "Username is required.";
	}
  
	if (!password) {
	  errors.password = "Password is required.";
	} else if (password.length < 8) {
	  errors.password = "Password must be at least 8 characters long.";
	}
  
	return errors;
  };

  export const validateProductForm = (product: any): Record<string, string> => {
	const errors: Record<string, string> = {};
  
	if (!product.name.trim()) {
	  errors.name = "Please enter the product name.";
	}
	if (product.available === "" || product.available < 0) {
	  errors.available = "Available quantity must be a non-negative number.";
	}
	if (product.sold === "" || product.sold < 0) {
	  errors.sold = "Sold quantity must be a non-negative number.";
	}
	if (product.price === "" || product.price <= 0) {
	  errors.price = "The product price must be a positive number.";
	}
	if (product.colorIds.length === 0) {
	  errors.colorIds = "Please select at least one color.";
	}
	if (!product.categoryId) {
	  errors.categoryId = "Please select a category.";
	}
  
	return errors;
  };
  
  export const validateName = (name: string, type: "category" | "color"): string | null => {
	const maxLength = type === "category" ? 20 : 10;
	const typeLabel = type === "category" ? "Category" : "Color";
  
	if (!name.trim()) {
	  return `${typeLabel} name is required.`;
	}
  
	if (name.length > maxLength) {
	  return `${typeLabel} name must be less than ${maxLength} characters.`;
	}
  
	return null; 
  };
  

  