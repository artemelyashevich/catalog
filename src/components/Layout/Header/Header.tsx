import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi"
import { ImExit } from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import Popup from '../../Popup/Popup'
import { setFilter } from '../../../store/slice/carSlice'
import { useAppDispatch, useAppSelector } from '../../../hook'
import debounce from 'lodash.debounce'
import { downAnimation, leftAnimation, rightAnimation, upAnimation } from '../../../animation/animation'
import { logout } from '../../../store/slice/userSlice'

const Header: React.FC = () => {
    const [popup, setPopup] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { filter } = useAppSelector(state => state.cars)
    const { isAuth } = useAppSelector(state => state.user)
    const { cartItems } = useAppSelector(store => store.cart)
    const searchFunc = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(setFilter({ ...filter, q: e.currentTarget.value }))
    }

    const debounceSearch = debounce(searchFunc, 300)
    return (
        <header>
            <div className='header'>
                <div className="header__top">
                    <div className="header__left">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3, once: true }}
                            className="header__left-logo">
                            <Link to="/">
                                <motion.h1 variants={leftAnimation}>Catalog</motion.h1>
                            </Link>
                        </motion.div>
                    </div>
                    {
                        !location.pathname.includes('cart') &&
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3, once: true }}
                            className="header__center">
                            <motion.input variants={upAnimation} onChange={debounceSearch} type="text"
                                className="header__center-input"
                                placeholder='Я ищу...' />
                        </motion.div>
                    }
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: true }}
                        className="header__right">
                        <motion.div variants={rightAnimation} className="header__right-login">
                            {
                                !isAuth ? <a onClick={() => setPopup(true)} style={{ cursor: 'pointer' }}>
                                    <div>
                                        <HiOutlineUser className="header__right_icon" />
                                    </div>
                                    <div>
                                        <p>Войти</p>
                                    </div>
                                </a> :
                                    <a onClick={() => dispatch(logout())} style={{ cursor: 'pointer' }}>
                                        <div>
                                            <ImExit className="header__right_icon" />
                                        </div>
                                        <div>
                                            <p>
                                                Выйти
                                            </p>
                                        </div>
                                    </a>
                            }
                        </motion.div>
                        <motion.div variants={rightAnimation} className="header__right-cart">
                            <Link to="/cart">
                                <div>
                                    <HiOutlineShoppingCart className="header__right_icon" />
                                </div>
                                <div>
                                    <p>Корзина</p>
                                </div>
                            </Link>
                        </motion.div>
                        <motion.div variants={rightAnimation}>
                            {
                                cartItems.length !== 0 && <p id="cart" style={{ fontSize: '20px' }}>{cartItems.length}</p>
                            }
                        </motion.div>
                    </motion.div>
                </div>
                {popup && <Popup popup={popup} setPopup={setPopup} />}
                {
                    !location.pathname.includes('cart') &&
                    <div className="header__bottom">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3, once: true }}
                            className="header__bottom-list">
                            <div>
                                <motion.label variants={downAnimation} className='header__bottom-list-item'>
                                    <p>Все</p>
                                    <input onChange={(e) => dispatch(setFilter({ ...filter, type: e.target.value }))} value={''} defaultChecked name="filter" type="radio" className="header__bottom-input" />
                                </motion.label>
                            </div>
                            <div>
                                <motion.label variants={downAnimation} className='header__bottom-list-item'>
                                    <p>Седан</p>
                                    <input onChange={(e) => dispatch(setFilter({ ...filter, type: e.target.value }))} value={'Седан'} name="filter" type="radio" className="header__bottom-input" />
                                </motion.label>
                            </div>
                            <div>
                                <motion.label variants={downAnimation} className='header__bottom-list-item'>
                                    <p>Внедорожник</p>
                                    <input onChange={(e) => dispatch(setFilter({ ...filter, type: e.target.value }))} value={'Внедорожник'} name="filter" type="radio" className="header__bottom-input" />
                                </motion.label>
                            </div>
                            <div>
                                <motion.label variants={downAnimation} className='header__bottom-list-item'>
                                    <p>Кабриолет</p>
                                    <input onChange={(e) => dispatch(setFilter({ ...filter, type: e.target.value }))} value={'Кабриолет'} name="filter" type="radio" className="header__bottom-input" />
                                </motion.label>
                            </div>
                        </motion.div>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header