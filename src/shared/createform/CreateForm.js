import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateForm.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { createuser } from "../../Services/user/createUser.js";
import Spinner from "../spinner/Spinner";
import { enqueueSnackbar } from "notistack";
import ErrorHandler from "../errorHandler/ErrorHandler";
const CreateForm = ({handleSubmit}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [spinner,setSpinner]=useState(false)
  const isValiPassword=(password)=>{
    // Use the regex pattern to check the password
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return pattern.test(password);
  }
  const handleFirstName = (e) => {
   try {
   
     setFirstName((prev)=>e.target.value)
   } catch (error) {
        <ErrorHandler type={"error"} message={error}/>

   }
  };
  const handleLastName = (e) => {
    try {
      
      setLastName((prev)=>e.target.value);
        
    } catch (error) {
          <ErrorHandler type={"error"} message={error}/>

      
    }
  };
  const handleUserName = (e) => {
  try {
   
     setUserName((prev)=>e.target.value);


  } catch (error) {
        <ErrorHandler type={"error"} message={error}/>

    
  }
  
  };
  const handlePassword = (e) => {

    setPassword((prev)=>e.target.value);
  };
  const handleIsAdmin = (e) => {
    setIsAdmin((prev)=>e.target.value);
  };

  const handleFormSubmit = async (e) => {
   try {
    setSpinner((prev)=>true)
    e.preventDefault()
    const result=isValiPassword(password)
    if(password.length==0||firstName.length==0||lastName.length==0||username.length==0){
      throw new Error("Please Fill The Form Completely")
    }
    if(!result){
      throw new Error("Invalid Password,At least 8 characters long Contains, at least one lowercase letter,Contains at least one uppercase letter,Contains at least one digit")
    }

    if(firstName.length==0){
      throw new Error("Invalid FirstName")
    }
    if(lastName.length==0){
      throw new Error("Invalid FirstName")
    }
    if(username.length==0){
      throw new Error("Invalid FirstName")
    }
    for(let i=0;i<firstName.length;i++){
      if(!((firstName[i]>="a"&& firstName[i]<="z")||(firstName[i]>="A"&& firstName[i]<="Z")))
{
  throw new Error("Invalid FirstName")
}    }
for(let i=0;i<lastName.length;i++){
  if(!((lastName[i]>="a"&& lastName[i]<="z")||(lastName[i]>="A"&& lastName[i]<="Z")))
{
throw new Error("Invalid lastName")
}    }
for(let i=0;i<username.length;i++){
  if(!((username[i]>="a"&& username[i]<="z")||(username[i]>="A"&& username[i]<="Z")))
{
throw new Error("Invalid username")
}    }
    const response=await createuser(firstName,lastName,username,password,isAdmin)
    if(response){
      enqueueSnackbar(`${firstName} Has Been Added To The User List`,{variant:"success"})
    }
   
    handleSubmit()
   } catch (error) {
    enqueueSnackbar(error.message,{ variant:"error"})
   }
   finally{
    setSpinner((prev)=>false)
   }
    
  };
  return (
    <>
    {spinner&&<Spinner/>}
    <label style={{marginLeft:"625px"}} className="form-title">User Registration Form</label>
    <form className="form">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">FirstName</label>
      <input type="text" className="form-control"  aria-describedby="emailHelp" onChange={handleFirstName}/>
     
    </div>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">LastName</label>
      <input type="text" className="form-control"  aria-describedby="emailHelp" onChange={handleLastName}/>
     
    </div>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">UserName</label>
      <input type="text" className="form-control"  aria-describedby="emailHelp" onChange={handleUserName}/>
     
    </div>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Password</label>
      <input type="text" className="form-control"  aria-describedby="emailHelp" onChange={handlePassword}/>
     
    </div> 
    <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" onClick={handleIsAdmin} value={true}/>
  <label className="form-check-label" for="inlineRadio1">Admin</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" onClick={handleIsAdmin} value={false}/>
  <label className="form-check-label" for="inlineRadio2">User</label>
</div>
    <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
  </form>
    


  </>
   
  );
};

export default CreateForm;
