import { useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound/NotFound"
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"
import './scss/style.scss'
import Cart from "./pages/Cart/Cart"
import { useAppDispatch, useAppSelector } from "./hook"
import { addToCartFromLS } from './store/slice/cartSlice'
import { fetchAllCars } from './store/slice/carSlice'


function App() {

  const dispatch = useAppDispatch()
  const { filter } = useAppSelector(state => state.cars)
  useEffect(() => {
    dispatch(addToCartFromLS())
  })
  useEffect(() => {
    dispatch(fetchAllCars(filter))
  }, [filter])

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
