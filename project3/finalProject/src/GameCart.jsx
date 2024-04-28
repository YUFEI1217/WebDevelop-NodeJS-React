import StoreProductionsList from "./data/StoreProductionsList";
import "./GameCart.css";
import { useState } from "react";
import Loading from "./Loading";

//Cart Creation
function GameCart({carts, updateCart, cartVisible, setCartVisible, username, onClearCart, isCartPending}) {

    let totalPriceAll = 0;
    // let totalProduct = 0;
    Object.values(carts).map( production => {
        totalPriceAll += production.subTotal;
        // totalProduct += Number(production.number);
    });


    const SHOW = {  // a constant used only in this component
        PENDING: "pending",
        EMPTY: "empty",
        CARTS: "carts",
    };

    let show;
    if (totalPriceAll === 0) {
        show = SHOW.EMPTY;
    } 
    else if(isCartPending){
        show = SHOW.PENDING;
    }
    else {
        show = SHOW.CARTS;
    }

    const handleAddOneNumber = (product) => {
        const existProductName = product.Pname;
        updateCart(existProductName, {
            [product.Pname]: { ...carts[product.Pname], number: carts[existProductName].number + 1, subTotal:  (carts[existProductName].number + 1) * carts[existProductName].Price }
        });
        
    }

    const handleMinusOneNumber = (product) => {
        if(carts[product.Pname].number > 0) {
            const existProductName = product.Pname;
            updateCart(existProductName, {
                [product.Pname]: { ...carts[product.Pname], number: carts[existProductName].number - 1, subTotal:  (carts[existProductName].number - 1) * carts[existProductName].Price }
            });
        }
    }

    const cartHtml = Object.values(carts).map( production => (

        production.number > 0 && (
        <li className="cart_item" key={production.Pname}>
            <div className="cart_detail">
                <h3 className="cart_name" >{production.Pname}</h3>
                <img className="cart_img"  src={production.Pimage} alt={production.Palt}/>
                <p className="cart_price" > $ {production.Price} </p>
                <div className="cart_operation">
                    <button className="cart_plus" type="button" onClick={() => handleAddOneNumber(production)}>+</button>
                    <span className="cart_number" >{production.number}</span>
                    <button className="cart_minus" type="button" onClick={() => handleMinusOneNumber(production)}>-</button>
                </div>
                <p className="cart_subtotal" >${(production.subTotal).toFixed(2)}</p>
            </div>
        </li>
        )
    ));


    return(
        <>
            <div className="cart" style={{display:cartVisible}}>
                <div className="btn_div">
                    <p className="allCart_name">{username}'s Cart</p>
                    <button className="hide_cart" type="button" onClick={() => {
                        setCartVisible("none");
                    }}>
                        Hide Cart
                    </button>
                </div>
                <ul className="cart_list">
                { show === SHOW.PENDING && <Loading/>}
                { show === SHOW.EMPTY && (
                    <p className="no_cart">Nothing in the cart yet, add one!</p>
                )}
                { show === SHOW.CARTS && cartHtml}
                </ul>
                <div className="checkout_div">
                    <span className="total_price">
                        Total Price: $ $ {totalPriceAll.toFixed(2)}
                    </span>
                    <button className="check_btn" type="button" onClick={() => {
                        onClearCart();
                    }}>
                        Checkout
                    </button>
                </div>
            </div>
        </>
    )
}

export default GameCart;