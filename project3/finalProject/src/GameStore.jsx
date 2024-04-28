import StoreProductionsList from "./data/StoreProductionsList";
import './GameStore.css';
import { useRef, useState } from 'react';
import GameCart from "./GameCart";

function GameStore({isCartPending, carts, onClearCart, addCart, updateCart, username }) {

    const [cartVisible, setCartVisible] = useState("none");

    const handleAddToCart = (product) => {

        const temp_product = {
            "Pname": product.Pname,
            "Palt": product.Palt,
            "Pimage": product.Pimage,
            "Price": product.Price,
            "number": product.number,
            "subTotal": product.subTotal
        }
        if (carts.hasOwnProperty(product.Pname)) {
            const existProductName = product.Pname;
            // If the production already exists in the cart, increment its number by 1
            updateCart(existProductName, {
                [product.Pname]: { ...carts[product.Pname], number: carts[existProductName].number + 1, subTotal:  (carts[existProductName].number + 1) * carts[existProductName].Price }
            });
        } else {
            // If the production is not in the cart, add it with a number of 1
            addCart(product.Pname, {
                [product.Pname]: { ...temp_product, number: 1, subTotal: temp_product.Price * 1 }
            });
        }
    };

    // Default Store items show
    const list = StoreProductionsList.map( item => {
        return (
            <li className="production__item" key={item.Pname}>
                <div className='production__detail'>
                    <h3 className='production_title'>
                        {item.Pname}
                    </h3>
                    <img className='production__img' src={item.Pimage} alt={item.Palt}/>
                    <p className="production__price">$ {item.Price}</p>
                    <p className="production__category">Category: {item.Pcategories}</p>
                    <button className="production__add" type="button" onClick={() => {
                        handleAddToCart(item);
                    }}>Add to cart</button>
                </div>
            </li>
        );
    });
    
    let totalProduct = 0;
    Object.values(carts).map( production => {
        if(!production.number) {
            for(let key in production) {
                if(production[key].number){
                    let productQuantity = production[key].number;
                    totalProduct += Number(productQuantity);
                }
            }
        }
        else{
            totalProduct += Number(production.number);
        }
        
    });


    return (
        <>
            <div className="filter__part">
                <span className="filter__placeholder"></span>
                <div className="filter__area">
                    <button className="show_cart" onClick={() =>{
                        setCartVisible("block");
                    }}>View Cart ({totalProduct})</button>
                </div>
            </div>
            <ul className="store__production__list">
                {list}
            </ul>
            <GameCart carts={carts} updateCart={updateCart} cartVisible={cartVisible} setCartVisible={setCartVisible} username={username} onClearCart={onClearCart} isCartPending={isCartPending}/>
        </>
    );
    
}

export default GameStore;