import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound/NotFound"
import Header from "./components/Layout/Header/Header"
import Footer from "./components/Layout/Footer/Footer"
import './scss/style.scss'
import Cart from "./pages/Cart/Cart"

function App() {
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
