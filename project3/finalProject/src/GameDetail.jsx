import { useState } from "react";
import './GameDetail.css';
import StoreProductionsList from "./data/StoreProductionsList";
import { MESSAGES, SERVER } from './constants';

function GameDetail({carts, addCart, updateCart}) {

    const [selectProductionIndex, setSelectProductionIndex] = useState(0);
    const [productNumber, setProductNumber] = useState(0);
    const [error, setError] = useState();

    const addGameDetailInfo = (selectProductionIndex) => {

        if(carts.hasOwnProperty(StoreProductionsList[selectProductionIndex].Pname)) {
            updateCart(StoreProductionsList[selectProductionIndex].Pname, {
                [StoreProductionsList[selectProductionIndex].Pname]: { ...carts[StoreProductionsList[selectProductionIndex].Pname], number: carts[StoreProductionsList[selectProductionIndex].Pname].number + Number(productNumber), subTotal:StoreProductionsList[selectProductionIndex].Price * productNumber}
            });
        } else {
            addCart(StoreProductionsList[selectProductionIndex].Pname, {
                [StoreProductionsList[selectProductionIndex].Pname]: {
                    "Pname": StoreProductionsList[selectProductionIndex].Pname,
                    "Palt": StoreProductionsList[selectProductionIndex].Palt,
                    "Pimage": StoreProductionsList[selectProductionIndex].Pimage,
                    "Price": StoreProductionsList[selectProductionIndex].Price,
                    "number": Number(productNumber),
                    "subTotal": StoreProductionsList[selectProductionIndex].Price * productNumber,
                }
            });
        }
    }

    // console.log(StoreProductionsList[0]);

    return(
        <div className="game_detail_page">
            <div className="Game_detail_left">
                <img className="game_detail_img" src={StoreProductionsList[selectProductionIndex].Pimage} alt={StoreProductionsList[selectProductionIndex].Palt}/>
            </div>
            <div className="Game_detail_right">
                <h2 className="Game_detail_title_h2">{StoreProductionsList[selectProductionIndex].Pname}</h2>
                <p className="game_detail_category">{StoreProductionsList[selectProductionIndex].Pcategories}</p>
                <div className="Game_price_item">
                    <label htmlFor="Game_price__select" className="Game--price__label">Select a product</label>
                    <select id="Game_price__select" className="Game--price__select" name="product" value={selectProductionIndex} onInput={
                        (e) => {
                            setSelectProductionIndex(e.target.value);
                            setProductNumber(0);
                        }
                    }>
                        <option value="0">{StoreProductionsList[0].Pname}</option>
                        <option value="1">{StoreProductionsList[1].Pname}</option>
                        <option value="2">{StoreProductionsList[2].Pname}</option>
                        <option value="3">{StoreProductionsList[3].Pname}</option>
                        <option value="4">{StoreProductionsList[4].Pname}</option>
                        <option value="5">{StoreProductionsList[5].Pname}</option>
                        <option value="6">{StoreProductionsList[6].Pname}</option>
                        <option value="7">{StoreProductionsList[7].Pname}</option>
                        <option value="8">{StoreProductionsList[8].Pname}</option>
                    </select>
                    <span className="Game_price_ShowSpan">{`$ ${StoreProductionsList[selectProductionIndex].Price}`}</span>
                </div>
                <form className="number_form" id="number_form" onSubmit={ (e) => {
                    e.preventDefault();
                    if(productNumber.match(/^[0-9_]+$/)){
                        setError("");
                        addGameDetailInfo(selectProductionIndex);
                    }
                    else if(!productNumber){
                        setError(MESSAGES[SERVER.REQUIRED_NUMBER]);
                    }
                    else {
                        setError(MESSAGES[SERVER.INVALID_NUMBER]);
                    }  
                }}>
                    <label className="number_label" htmlFor="number_input">Input quantity:</label>
                    <input className="number_input" id="number_input" name="productNumber" value={productNumber} onChange={(e) => {
                        setProductNumber(e.target.value);
                    }}/>
                    <span className="error_part">{error}</span>
                    <span className="subTotal_show">SubTotal: ${(StoreProductionsList[selectProductionIndex].Price * productNumber).toFixed(2)}</span>
                    <button type="submit" className="number_input__btn">Add to cart</button>
                </form>
            </div>
        </div>
    );
}

export default GameDetail;