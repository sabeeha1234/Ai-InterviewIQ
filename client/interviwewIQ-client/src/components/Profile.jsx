import { useContext } from "react"
import { UserProvider } from "./Contextprovider"


function Profile() {
  const {userdetails}=useContext(UserProvider)
  return (
    <div className="h-screen">
      <div className="h-40 mt-10 border">
        <div className="flex justify-end">
          <button className="mr-2">Edit</button>
        </div>

      </div>
    </div>
  )
}

export default Profile