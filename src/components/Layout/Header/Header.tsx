import React, {useState} from 'react'
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi"
import { Link } from 'react-router-dom'
import Popup from '../../Popup/Popup'

const Header: React.FC = () => {
    const [popup, setPopup] = useState<boolean>(false)
    return (
        <header>
            <div className='header'>
                <div className="header__top">
                    <div className="header__left">
                        <div className="header__left-logo">
                            <Link to="/">
                               <h1>Catalog</h1> 
                            </Link>
                        </div>
                    </div>
                    <div className="header__center">
                        <input type="text"
                            className="header__center-input"
                            placeholder='Я ищу' />
                    </div>
                    <div className="header__right">
                        <div className="header__right-login">
                            <a onClick={() => setPopup(true)} style={{cursor: 'pointer'}}>
                                <div>
                                    <HiOutlineUser className="header__right_icon"/>
                                </div>
                                <div>
                                    <p>Войти</p>
                                </div>
                            </a>
                        </div>
                        <div className="header__right-cart">
                            <Link to="/cart">
                                <div>
                                    <HiOutlineShoppingCart className="header__right_icon"/>
                                </div>
                                <div>
                                    <p>Корзина</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {popup && <Popup popup={popup} setPopup={setPopup}/>}
                <div className="header__bottom">
                    <div className="header__bottom-list">
                        <div>
                            <label className='header__bottom-list-item'>
                                <p>Все</p>
                                <input defaultChecked name="filter" type="radio" className="header__bottom-input" />
                            </label>
                        </div>
                        <div>
                            <label className='header__bottom-list-item'>
                                <p>Седан</p>
                                <input name="filter" type="radio" className="header__bottom-input" />
                            </label>
                        </div>
                        <div>
                            <label className='header__bottom-list-item'>
                                <p>Внедорожник</p>
                                <input name="filter" type="radio" className="header__bottom-input" />
                            </label>
                        </div>
                        <div>
                            <label className='header__bottom-list-item'>
                                <p>Кабриолет</p>
                                <input name="filter" type="radio" className="header__bottom-input" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header