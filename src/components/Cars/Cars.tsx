import React from 'react'
import { useAppSelector } from '../../hook'
import Car from './Car'

const Cars: React.FC = () => {
    const { list, loading } = useAppSelector(state => state.cars)
    return (
        <div className='home__cars'>
            { loading ? <p>Загрузка...</p> :
                list.map(item => {
                    return (
                        <Car key={item.id} item={item} />
                    )
                })
            }
        </div>
    )
}

export default Cars