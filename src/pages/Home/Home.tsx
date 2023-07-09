import React from 'react'
import { useAppSelector } from '../../hook'
import Cars from '../../components/Cars/Cars'


const Home: React.FC = () => {

    const { error } = useAppSelector(state => state.cars)

    return (
        <div className='home'>
            <div className="container">
                <Cars />
            </div>
            <div className="errors">
                {
                    error && <p>{error}</p>
                }
            </div>
        </div>
    )
}

export default Home