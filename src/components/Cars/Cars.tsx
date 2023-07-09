import React from 'react'
import { useAppSelector } from '../../hook'
import Car from './Car'

const Cars: React.FC = () => {
    const { list, loading, filter } = useAppSelector(state => state.cars)
    return (
        <div className='home__cars'>
            {loading ? <p>Загрузка...</p> :
                list.filter(el => el.title.toLowerCase().includes(filter?.q?.toLowerCase())).map(item => {
                    return (
                        <Car key={item.id} item={item} />
                    )
                })
            }
            {
                list.filter(el => el.title.toLowerCase().includes(filter?.q?.toLowerCase())).length === 0 && <p>Машин с таким названием не найдено...</p>
            }
        </div>
    )
}

export default Cars