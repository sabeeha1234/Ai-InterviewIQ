import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Signup() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    phone: "",
  }); //this  is js so u wrote it inn camelcase

  const navigate = useNavigate()

  function updateFormData(e) {
    //const e.target ={htmml:"",name:name,value:"value"}
    const { name, value } = e.target;
    console.log(name, value);

    //create a new object copy formvalues
    const updatedFormValues = { ...formValues };
    updatedFormValues[name] = value;

    if (name == "phone" && value.length > 10) {
      console.log("wrong number format");
    }
    setFormValues(updatedFormValues);
  }
  async function signup(e) {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      toast("Password is missmatched", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      return;
    }

    const body ={
        name:formValues.name,
        email:formValues.email,
        age:formValues.age,
        phone:formValues.phone,
        password:formValues.password
    }


    try{
         const data = await axios.post(
      "http://localhost:4000/auth/signup",
      body,
    );
    console.log(data, "signup");
    navigate("/login")

    }catch(err){
        console.log(err.message)
        toast.error(err.message)
    }

   
  }

  console.log(formValues);
  return (
    <>
      <div className="h-screen flex  flex-col justify-center items-center ">
        <form className="flex flex-col gap-3" onSubmit={signup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="border"
              required
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              onChange={updateFormData}
            />
            {/* //inorder to get the pointer on input when clicked on labelname use id  */}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border"
              required
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={updateFormData}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="border"
              required
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={updateFormData}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm-password</label>
            <input
              className="border"
              type="password"
              required
              name="confirmPassword"
              id="confirmPassword"
              value={formValues.confirmPassword}
              onChange={updateFormData}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              className="border"
              type="number"
              name="age"
              id="age"
              value={formValues.age}
              onChange={updateFormData}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              className="border"
              required
              type="text"
              name="phone"
              id="phone"
              value={formValues.phone}
              onChange={updateFormData}
            />
          </div>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        

      </div>
    </>
  );
}

export default Signup;
