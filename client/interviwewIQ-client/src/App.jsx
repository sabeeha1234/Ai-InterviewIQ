
import { BrowserRouter, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedLayout from './components/ProtectedLayout'
import AuthproLayout from './components/AuthproLayout'
import Fallbackcom from './components/Fallbackcom'
import Profile from './components/Profile'
import { useState } from 'react'
import SideBar from './components/SideBar'
import NewInterview from './pages/NewInterview'
import History from './pages/History'
import Contextprovider from './components/Contextprovider'
function App() {
   return (
    <>
    <ToastContainer/>
    <Contextprovider>
    <BrowserRouter>
    
   <Routes>
     {/* created a parent route for all these routes */}
    <Route element={<Layout/>}>

    

      <Route element={<ProtectedLayout/>}>
        <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
      </Route>

      <Route element={<AuthproLayout/>}>
      
        <Route path='*' element={<Fallbackcom/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/new-interview' element={<NewInterview/>}/>
        <Route path='/history' element={<History/>}/>
      </Route>

    </Route>
      
      
      
       






    </Routes>
    </BrowserRouter>
    </Contextprovider>
    </>


  )
}
   //created this funciton for sidebar and routes working
    function Layout(){
      const location = useLocation()
      // this is used to tract the location of the current route so that we can perform sidebar
      console.log(location.pathname)//gives the name of currentpath
      const isbarhidden=location.pathname == "/login" || location.pathname == "/signup"
      return(
        <>
        <div className='h-screen flex'>
          {
            !isbarhidden && <div className='border w-36'>
              <SideBar/>
              </div>
          }
          <div className='w-full'>
            <Outlet/>
          </div>


        </div>
        
        </>

        
      )

    }


export default App
