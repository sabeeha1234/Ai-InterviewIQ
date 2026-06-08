import { Link, useNavigate } from "react-router"
import { Navitems } from "../utils/Navitems"

function SideBar() {
  const navigate = useNavigate()

  function logout(){
    localStorage.clear()
    navigate("/login")

  }
  return (
    <div className="flex flex-col justify-between h-screen py-5 pl-2">
      <div>
        <header>
          <h1>Ai InterviewIQ</h1>
        </header>
         
         <nav className="mt-10">
          <ul>
            {Navitems.map((items)=>{
              return <li key={items.path}>
                <Link to={items.path}>{items.name}</Link>
              </li>
            })}
          </ul>


         </nav>

      </div>
      <div>
        <button onClick={logout} className="cursor-pointer">Log Out</button>
      </div>




    </div>
  )
}

export default SideBar