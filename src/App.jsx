import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Products from './components/products/Products'
import Services from './components/services/Services'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import Product from './components/singleProduct/Product'
import NotFound from './components/NotFound/NotFound'


function App() {
  
  return (
  <>
    <Navbar/>
    <Routes>      
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/product/:id' element={<Product/>}></Route>
      <Route path='/services' element={<Services/>}></Route>
      <Route path='/*' element={<NotFound/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
