
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'


function App() {
  

  return (
    <>
     <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>

        </Routes>
      
     </div>
    </>
  )
}

export default App
