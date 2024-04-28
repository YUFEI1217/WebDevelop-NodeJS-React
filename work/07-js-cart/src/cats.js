import model, {SHOW, state} from './model';
import render from './render';



const appEl = document.querySelector("#app");
const cartEl = document.querySelector("#cart");
appEl.addEventListener('click', (e) =>{
    if(e.target.classList.contains("cat_btn")) {
        const index = e.target.dataset.index;
        model.addCart(index);
        model.addTotalNumber();
        render(state, appEl, cartEl);
        return;
    }

    if(e.target.classList.contains("show_cart")) {
        state.show = e.target.dataset.target;
        const catEl = document.querySelector(".cats_list");
        const viewCartBtn = document.querySelector(".show_cart");
        const coverDiv = document.querySelector(".cover_div");
        viewCartBtn.style.visibility = "hidden";
        coverDiv.style.display="block";
        coverDiv.style.height = document.body.clientHeight + 20 + "px";
        catEl.classList.toggle("showCart");
        cartEl.style.display = "block";
        render(state, appEl, cartEl);
        return;
    }
});

cartEl.addEventListener('click', (e) => {
    if(e.target.classList.contains("hide_cart")) {
        state.show = e.target.dataset.target;
        const viewCartBtn = document.querySelector(".show_cart");
        const coverDiv = document.querySelector(".cover_div");
        coverDiv.style.display = "none";
        viewCartBtn.style.visibility = "visible";
        cartEl.style.display = "none";
        render(state, appEl, cartEl);
        return;
    }

    if(e.target.classList.contains("cart_plus")) {
        const index = e.target.dataset.index;
        model.addCart(index);
        model.addTotalNumber();
        render(state, appEl, cartEl);
        return;
    }

    if(e.target.classList.contains("cart_minus")) {
        const index = e.target.dataset.index;
        if(state.cats[index].number > 0){
            model.minusCart(index);
            model.minusTotalNumber();
        }
        render(state, appEl, cartEl);
        return;
    }

    if(e.target.classList.contains("check_btn")) {
        for(let i = 0; i < state.cats.length; i++) {
            model.checkCart(i);
        }
        model.checkTotalNumber();
        cartEl.style.display = "none";
        const viewCartBtn = document.querySelector(".show_cart");
        const coverDiv = document.querySelector(".cover_div");
        coverDiv.style.display = "none";
        viewCartBtn.style.visibility = "visible";
        state.show = "cat";
        render(state, appEl, cartEl);
        return;
    }

});



render(state, appEl, cartEl);