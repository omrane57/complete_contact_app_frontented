import axios from "axios"
export  const  createuser=async(firstName,lastName,username,password,isAdmin)=>{
let response
   if(isAdmin=="true"){
      response=await axios.post(`http://127.0.0.1:20200/api/v1/user`,{firstName:firstName,lastName:lastName,username:username,password:password,isAdmin:true},{headers: { auth: localStorage.getItem("auth") }})
   }
   if(isAdmin=="false"){
      response=await axios.post(`http://127.0.0.1:20200/api/v1/user`,{firstName:firstName,lastName:lastName,username:username,password:password,isAdmin:false},{headers: { auth: localStorage.getItem("auth") }})

   }
return response

}