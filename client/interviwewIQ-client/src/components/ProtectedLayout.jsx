
import { Navigate, Outlet } from 'react-router'

function ProtectedLayout() {
  
    console.log("protected layout getitng executed")
    const  user = localStorage.getItem("user")
    if(user){
        return <Navigate to="/" replace/>
        //updating browser history
        // used replace because when user clicks on backpage he might visit to signup page which is bad code so use replace which
        // replaces signup with home
    }else{
        return <Outlet/>
    }

}

export default ProtectedLayout