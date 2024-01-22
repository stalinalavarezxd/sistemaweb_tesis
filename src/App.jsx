import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lista from './components/Lista'
import Form from './components/Form'
import ConsultaSeniales from './components/ConsultaSeniales'
import EditarSenial from './components/EditarSeniales'



function App() {
  return (
    <>
      <div className="container">
        <Form/>
        <Lista/>
        <ConsultaSeniales/>
        
      </div>
    
    </>
  )
}

export default App
