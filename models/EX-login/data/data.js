//const URL = 'http://localhost:8080/login'


/**
 * Represents an address.
 *
 * @param {string} street - The street name.
 * @param {string} city - The city name.
 * @param {string} country - The country name.
 * @param {string} zip - The zip code.
 * @returns {object} - The address object.
 */
function Address(street, city, country, zip) {
  return {
    type: 'Address',
    street: street,
    city: city,
    country: country,
    zip: zip
  }
}

/**
 * Represents a customer.
 * 
 * @param {string} email - The email of the customer.
 * @param {string} firstName - The first name of the customer.
 * @param {string} lastName - The last name of the customer.
 * @param {string} password - The password of the customer.
 * @param {string} address - The address of the customer.
 * @param {boolean} isEnabled - Indicates if the customer is enabled.
 * @param {Array} cartItems - The items in the customer's cart.
 * @returns {Object} - The customer object.
 */
function Customer(email, firstName, lastName, password, address, isEnabled, cartItems) {
  return {
    type: 'Customer',
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    address: address,
    isEnabled: isEnabled,
    cartItems: cartItems
  }
}

/**
 * Represents an admin user.
 * 
 * @param {string} email - The email of the admin.
 * @param {string} password - The password of the admin.
 * @returns {Object} - The admin entity.
 */
function Admin(email, password) {
  return {
    type: 'Admin',
    email: email,
    password: password
  }
}


/**
 * Represents a product.
 * @param {string} name - The name of the product.
 * @param {number} price - The price of the product.
 * @param {number} stock - The stock quantity of the product.
 * @returns {object} - The product object.
 */
function Product(name, price, stock) {
  return {
    type: 'Product',
    name: name,
    price: price,
    stock: stock
  }
}


// Array containing data entries for our tests
const data = [
  Customer('bob.smith@prestashop.com', 'Bob', 'Smith', 'bob.smith@prestashop.com', Address('16 Main St', 'Paris', 'France', '75002'), true, []),

  Admin('demo@prestashop.com', 'prestashop_demo'),

  Product('HUMMINGBIRD PRINTED T-SHIRT', 23.9, 300),
  Product('HUMMINGBIRD PRINTED SWEATER', 35.9, 1200),
];


// Filter the data array to get the different types of entities
const products = data.filter(entity => entity.type === 'Product');
const customers = data.filter(entity => entity.type === 'Customer');
const admins = data.filter(entity => entity.type === 'Admin');

