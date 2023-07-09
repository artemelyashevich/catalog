import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hook'
import { Link } from 'react-router-dom'
import { removeAllFromCart, removeFromCart } from '../../store/slice/cartSlice'
import { leftAnimation, rightAnimation } from '../../animation/animation'
import Purchase from '../../components/Popup/Purchase'


const Cart: React.FC = () => {

  const { cartItems, cartTotalPrice } = useAppSelector(store => store.cart)
  const [popup, setPopup] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  return (
    <div className='cart'>
      <div className="container">
        {
          cartItems.length === 0 ? <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            className='cart__no-content'>
            <h1>Корзина пуста</h1>
            <p>
              Чтобы найти необходимые товары, воспользуйтесь поиском или каталогом.
            </p>
            <Link to="/">
              <button className='home__cars__car-btn'>
                За покупками
              </button>
            </Link>
          </motion.div> : <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            style={{ display: 'flex', justifyContent: 'space-around' }}>
            <motion.button variants={leftAnimation} onClick={() => dispatch(removeAllFromCart())} style={{ marginBottom: '50px' }} className='home__cars__car-btn'>Очистить корзину</motion.button>
            <div>
              <p>Общая стоимость: {cartTotalPrice}</p>
            </div>
            <div>
              <motion.button onClick={() => setPopup(true)} variants={rightAnimation} style={{ marginBottom: '50px' }} className='home__cars__car-btn'>Купить</motion.button>

            </div>
          </motion.div>
        }
        {
          popup && <Purchase popup={popup} setPopup={setPopup} />
        }
        {
          cartItems.map(el => {
            return (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3, once: true }}
                className='cart__item' key={el.id}>
                <div className='cart__item__left'>
                  <motion.img variants={leftAnimation} src={el.photo} alt="IMG" />
                </div>
                <motion.div variants={rightAnimation} className='cart__item__right'>
                  <div>
                    <span style={{ display: 'flex', columnGap: '10px', marginBottom: '15px' }}>
                      Цена: <p>{el.price}</p>
                    </span>
                  </div>
                  <h2 style={{ marginBottom: '20px' }}>
                    {el.title}
                  </h2>
                  <p style={{ width: '700px' }}>
                    {el.description}
                  </p>
                  <button onClick={() => dispatch(removeFromCart(el))} style={{ marginTop: '20px' }} className='home__cars__car-btn'>
                    Удалить из корзины
                  </button>
                </motion.div>
              </motion.div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart