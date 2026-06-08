import { Link } from "react-router"
function Fallbackcom() {
  return (
    <div className="h-screen flex justify-center items-center">
      
      <div>
        <h1>Page Not Found</h1>
        <Link to="/">Redirect to <span className=" text-blue-600">Home</span></Link>
    </div>
    </div>
    
  )
}

export default Fallbackcom