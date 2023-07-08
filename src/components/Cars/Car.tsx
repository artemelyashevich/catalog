import React from 'react'
import { CarI } from '../../Interfaces/CarInterface';

interface CarInterface {
    item: CarI;
}

const Car: React.FC<CarInterface> = (props) => {
    return (
        <div>
            <div key={props.item.id} className='home__cars__car'>

            </div>
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
                    <button type='button' className='home__cars__car-btn'>В корзину</button>
                </div>
            </div>

        </div>
    )
}

export default Car