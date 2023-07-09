import React from 'react'
import { ICar } from '../../Interfaces/Interfaces';
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hook';
import { addToCart, removeFromCart } from '../../store/slice/cartSlice';
import { downAnimation } from '../../animation/animation';

interface CarInterface {
    item: ICar;
}

const Car: React.FC<CarInterface> = (props) => {

    const dispatch = useAppDispatch()
    const { cartItems } = useAppSelector(store => store.cart)

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
        >
            <motion.div variants={downAnimation} key={props.item.id} className='home__cars__car'>
                <div className="home__cars__car-photo">
                    <img src={props.item.photo} alt="IMG" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
                    <div className="hone__cars__car__left">
                        <div className='home__cars__car-title'>
                            <h3>
                                {props.item.title}
                            </h3>
                        </div>
                        <div className="home__cars__car-price">
                            <p>
                                {props.item.price}€
                            </p>

                            <div className="home__cars__car-type">
                                <p>
                                    {props.item.type}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            cartItems.find(el => el.id === props.item.id) ? <button type='button' className='home__cars__car-btn' onClick={() => dispatch(removeFromCart(props.item))}>Удалить из корзины</button> : <button onClick={() => dispatch(addToCart(props.item))} type='button' className='home__cars__car-btn'>Добавить в корзину</button>
                        }
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Car