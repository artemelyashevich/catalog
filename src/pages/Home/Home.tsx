import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hook'
import { fetchAllCars } from '../../store/slice/carSlise'
import Cars from '../../components/Cars/Cars'


const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(fetchAllCars())
    }, [])
    return (
        <div className='home'>
            <div className="container">
                <Cars/>
            </div>
        </div>
    )
}

export default Home