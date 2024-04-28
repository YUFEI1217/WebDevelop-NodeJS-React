export const SHOW = {
    CATS: "cat",
    CART: "cart",
};

export const state = {
    cats: [
        { name: "Nebelung Cat", src: "http://placekitten.com/150/150?image=1", alt: "This is the image for Nebelung Cat", price: 0.99, number: 0},
        { name: "Laperm Cat", src: "http://placekitten.com/150/150?image=2", alt: "This is the image for Laperm cat", price: 3.14, number: 0},
        { name: "Tabby Cat", src: "http://placekitten.com/150/150?image=3", alt: "This is the image for Tabby cat", price: 2.73, number: 0},
    ],
    show: SHOW.CATS,
    totalNumber: 0,
};

function addCart(index) {
    state.cats[index].number += 1;
}

function addTotalNumber() {
    state.totalNumber += 1;
}

function minusCart(index) {
    state.cats[index].number -= 1;
}

function minusTotalNumber() {
    state.totalNumber -= 1;
}

function checkCart(index) {
    state.cats[index].number = 0;
}

function checkTotalNumber() {
    state.totalNumber = 0;
}

export default {addCart, addTotalNumber, minusCart, minusTotalNumber, checkCart, checkTotalNumber };