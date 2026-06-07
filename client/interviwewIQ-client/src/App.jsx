
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
// transition={Bounce}
/>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>






    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
