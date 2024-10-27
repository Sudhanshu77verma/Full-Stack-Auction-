import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    


    <div>  
     
    <Routes>
    <Route path='/sign-up' element={<Signup></Signup>} ></Route>
    <Route path='/login' element={<Login></Login>} ></Route>
    {/* <Route path='/sign-up' element={<Signup></Signup>} ></Route>
    <Route path='/sign-up' element={<Signup></Signup>} ></Route> */}

    </Routes>
    </div>
  )
}

export default App