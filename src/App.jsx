import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Products from './components/products/Products'
import Services from './components/services/Services'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'

function App() {
  
  return (
  <>
    <Navbar/>
    <Routes>      
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/services' element={<Services/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
