import { useState, useRef, useId } from 'react';
import HomeCard from "./data/HomeCard";
import './HomeMainPanel.css';
import PS5_img from "../images/kerde-severin-NVD_32BBZFE-unsplash.jpg";
import Xbox_img from "../images/sam-pak-X6QffKLwyoQ-unsplash.jpg";
import Switch_img from "../images/ahmad-mohammed-wGc4AQ3BJ_U-unsplash.jpg";
import PC_img from "../images/christian-wiediger-XfSk_BMLj0A-unsplash.jpg";

function HomeMainPanel({setPage}) {

    const id = useId;
    const [username, setUsername] = useState('');

    const Homecard_img = [PS5_img, Xbox_img, Switch_img, PC_img];

    const list = HomeCard.map( (item,idx) => {
        return (
            <li className="home_main_item" key={item.Hname}>
            <div className='home_card'>
                <h3 className='home_card_title'>
                    {item.Hname}
                </h3>
                <div className="home_img_area">
                    <img className='home_card_img' src={Homecard_img[idx]} alt={item.alt}/>
                </div>
                <p>{item.para1}</p>
                <p>{item.para2}</p>
                <p>{item.para3}</p>
                <p>{item.para4}</p>
                <p>Click here to <a className="home_card_link" href='/GameDetail' onClick={(e) => {
                    e.preventDefault();
                    setPage(e.target.pathname);
                    window.history.pushState(null, '', e.target.pathname);
                }}>BUY</a> this production!</p>
            </div>
          </li>
        );
    });


    return (
        <ul className="home_main_list">
            { list }
        </ul>
    );
}

export default HomeMainPanel;