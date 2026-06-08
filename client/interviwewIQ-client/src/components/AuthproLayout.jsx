
import { Navigate, Outlet } from 'react-router'

function AuthproLayout() {
    if(!localStorage.getItem("user"))return <Navigate to="/login" replace/>
  return (
    <div>
  
<Outlet/>
    </div>
  )
}

export default AuthproLayout