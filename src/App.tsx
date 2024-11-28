import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Categories from './pages/Category'
import Products from './pages/Products'
import Orders from './pages/orders/Orders'
import CreateOrder from './pages/orders/CreateOrder'

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <BrowserRouter>
        <Routes>
          <Route path='/category' element={<Categories/>}/>
          <Route path='/product' element={<Products/>}/>
          <Route path='/order' element={<Orders/>}/>
          <Route path='/order/create' element={<CreateOrder/>}/>
        </Routes>
      </BrowserRouter>
   
  )
}

export default App
