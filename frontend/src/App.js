import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SupplierForm from './Components/SupplierForm'
import ItemForm from './Components/ItemForm'
import PurchaseOrder from './Components/PurchaseOrder'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pb-20">
          <Routes>
            <Route path='/' element={<ItemForm/>}/>
            <Route path='/supplier' element={<SupplierForm/>}/>
            <Route path='/purchase' element={<PurchaseOrder/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App