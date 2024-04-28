import { SHOW } from "./model";

export default function render(state, appEl, cartEl) {
    if(state.show === SHOW.CATS) {
        renderCat(state, appEl);
    }
    else if(state.show === SHOW.CART) {
        renderCart(state, cartEl);
    }
};

function generateCatHtml(cats) {
    const catHtml = cats.map( (cat, index) => {

        return `
        <li class="cat_item">
            <div class="cat_detail">
                <h2 data-index="${index}" class="cat_name">${cat.name}</h2>
                <img data-index="${index}" class="cat_img" src=${cat.src} alt=${cat.alt}/>
                <p data-index="${index}" class="cat_price">$${cat.price} each</p>
                <button data-index="${index}" class="cat_btn" type="button">Add to cart</button>
            </div>
        </li>
        `
    }).join('');

    return catHtml;
}

function generateCartHtml(cats) {
    let totalPrice = 0;
    const cartHtml = cats.map( (cat, index) => {
        totalPrice += cats[index].price * cats[index].number;
        if(cats[index].number > 0){
            return `
        <li class="cart_item">
            <div class="cart_detail">
                <h2 data-index="${index}" class="cart_name">${cat.name}</h2>
                <img data-index="${index}" class="cart_img" src=${cat.src} alt=${cat.alt}/>
                <p data-index="${index}" class="cart_price">$${cat.price} each</p>
                <div class="cart_operation">
                    <button data-index="${index}" class="cart_plus" type="button">+</button>
                    <span data-index="${index}" class="cart_number">${cat.number}</span>
                    <button data-index="${index}" class="cart_minus" type="button">-</button>
                </div>
            </div>
        </li>
        `
        }
    }).join('');

    return {cartHtml, totalPrice};
}
function generatePriceDiv(price) {
    return `
    <div class="footer_div">
        <span class="total_price">
            Total Price: $ ${price}
        </span>
        <button class="check_btn" type="button">
            Checkout
        </button>
    </div>
    `;
}
 
function renderCat(state, appEl) {

    const catHtml = generateCatHtml(state.cats);
    
    appEl.innerHTML = `
    <h1 class="main_h1">Product Page</h1>
    <div class="cover_div"></div>
    <div class="btn_div">
        <button class="show_cart" type="button" data-target="cart">View Cart(${state.totalNumber})</button>
    </div>
    <ul class="cats_list">
        ${catHtml}
    </ul>
    `;

};

function renderCart(state, cartEl) {

    
    if(state.totalNumber === 0){
        let totalPrice = 0;
        const priceDiv = generatePriceDiv(totalPrice.toFixed(2));
        cartEl.innerHTML = `
        <div class="btn_div">
            <button class="hide_cart" type="button" data-target="cat">
                Hide Cart
            </button>
        </div>
        <ul class="cart_list">
            <p class="no_cat">Nothing in the cart</p>
        </ul>
        ${priceDiv}
        `;
    }
    else{
        
        let {cartHtml, totalPrice} = generateCartHtml(state.cats);
        const priceDiv = generatePriceDiv(totalPrice.toFixed(2));

        cartEl.innerHTML = `
        <div class="btn_div">
            <button class="hide_cart" type="button" data-target="cat">
                Hide Cart
            </button>
        </div>
        <ul class="cart_list">
            ${cartHtml}
        </ul>
        ${priceDiv}
        `;
    }
};