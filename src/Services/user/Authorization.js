import axios from "axios"
export  const  login=async(username,password)=>{
  
   const response=await axios.post(`http://127.0.0.1:20200/api/v1/login`,{username:username,password:password})
   console.log(response)
   return response
}