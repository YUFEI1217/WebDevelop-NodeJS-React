// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function createCart() {
  // These are hardcoded initial state when we restart the server
    

    const cartList = {};
    const carts = {
        // The below syntax lets you use a variable value as the key
        // if the value of id1 is "asdf", the property is "asdf", not "id1"
        
        // "PS5": {
        //     Pname: 'PS5',
        //     Palt: "The PlayStation 5 consoles image from https://unsplash.com/photos/black-and-white-xbox-one-game-controller-NVD_32BBZFE",
        //     Pimage: "../../images/kerde-severin-NVD_32BBZFE-unsplash.jpg",
        //     Price: 499.99,
        //     number: 1,
        //     subTotal: 499.99,
        // },
        // "LOL": {
        //     Pname: 'LOL',
        //     Palt: "The image of LOL from https://unsplash.com/photos/black-flat-screen-computer-monitor-cFBNhWF21aQ",
        //     Pimage: "../../images/igor-rodrigues-cFBNhWF21aQ-unsplash.jpg",
        //     Price: 9.99,
        //     number: 2,
        //     subTotal: 19.98,
        // },
    }

    cartList.contains = function contains(productionName) {
        // This !! syntax coerces the value to a boolean
        // First by giving us the reverse of the truthy/falsy value,
        // then by reversing it to true/false
        return !!carts[productionName];
    };

    cartList.getCarts = function getCarts() {
        return carts;
    };

    cartList.addCart = function addCart(production) {
        const productionName = Object.keys(production);
        carts[productionName] = production[productionName];
        return productionName;
    };

    cartList.getCart = function getCart(productionName) {
        return carts[productionName];
    };

    cartList.updateCart = function updateCart(productionName, production) {
        // this uses ?? because we need to accept `false` as a legit value
        carts[productionName] = production.production[productionName];
    };


    cartList.clearCart = function clearCart() {
        // clear all production in the cart;
        for(const key in carts) {
            delete carts[key];
        }
    };

    return cartList;
};

module.exports = {
    createCart,
};