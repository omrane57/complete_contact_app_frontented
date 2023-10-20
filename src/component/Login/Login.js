import React, { useState } from "react";
import "./Login.css";
import {login as userLogin} from "../../Services/user/Authorization"
import { useNavigate } from "react-router-dom";
import { SnackbarProvider,enqueueSnackbar } from "notistack";
import Spinner from "../../shared/spinner/Spinner";
// import ErrorHandler from "../../shared/errorHandler/ErrorHandler";
import ErrorHandler from "../../shared/errorHandler/ErrorHandler";

const Login = () => {
  const navigate=new useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spinners,setSpinner]=useState(false)
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };
 
  const handleMyLogin = async (e) => {
    try{
      
      setSpinner((prev)=>true)
      e.preventDefault();
      if((username.length==0) && (password.length==0))
      if (username.length == 0) {
       throw new Error("Invalid Username And Password")  
       
      }
      if (password.length < 2) {
        throw new Error("Invalid Password")  


      }
      const response=await userLogin(username,password)
      console.log(response.headers.auth)
      localStorage.setItem("auth",response.headers.auth)
      localStorage.setItem("username",response.data.username)
      localStorage.setItem("isAdmin",response.data.isAdmin)
      localStorage.setItem("id",response.data.id)
      
  
      console.log(response);
      if(!response?.data.id){
        enqueueSnackbar('invalid Password',{variant:"error"})
        return
      }
      const isAdmin=response.data.isAdmin
       if(isAdmin){
        navigate(`/allusers`)
       }
       else{

        navigate(`/user`)
        
       }

    }
    catch(error){
      // ErrorHandler(error)
    
      // <ErrorHandler error={error}/>
      // enqueueSnackbar(error.message,{variant:"error"})
    }
    finally{
      setSpinner((prev)=>false)
    }
   
  
   
  };
 
  return (
    <>
    
{spinners&&<Spinner/>}
    <div className="card text-center">
  <h5 className="card-header">Login</h5>
  <div className="card-body">
  <div className="input-group input-group-lg">
      <span className="input-group-text " id="inputGroup-sizing-lg" >Username</span>
      <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleUsernameChange}/>
    </div>
    <div className="input-group input-group-lg">
      <span className="input-group-text" id="inputGroup-sizing-lg" >Password</span>
      <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handlePasswordChange}/>
    </div>

    <br></br>
    <button type="button" className="btn btn-primary" onClick={handleMyLogin}>Login</button>
  </div>
</div>
   </> 
  );
};

export default Login;
