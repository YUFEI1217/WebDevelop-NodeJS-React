import './Header.css';
import { useState } from "react";
import LogoImage from '../images/701701507378_pic.jpg';

function Header({setPage, onLogout}) {

    function changePage(e) {
        if(e.target.classList.contains("global-nav__link")){
            e.preventDefault();
            setPage(e.target.pathname);
            window.history.pushState(null, '', e.target.pathname);
        }  
    }
    

    return (
        <header className="header">
            <img
            src={LogoImage}
            className="header__logo"
            alt="The main Logo for game website which is my personally own picture for my undergraduate university"
            />
            <div className="header__h1__area">
                <button className="logout_btn" id="logout_btn" onClick={onLogout}>Logout</button>
                <h1 className="header__title">
                    Welcome to Games World
                </h1>
            </div>
            <nav className='header__nav'>
                <ul className='global-nav__list' onClick={ (e) => changePage(e)}>
                    <li className="global-nav__item">
                        <a className="global-nav__link" href='/'>Home</a>
                    </li>
                    <li className="global-nav__item">
                        <a className="global-nav__link" href='/GameStore' >Store</a>
                    </li>
                    <li className="global-nav__item">
                        <a className="global-nav__link" href='/About' >About</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;