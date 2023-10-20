import axios from "axios"
export  const  createcontact=async(firstName,lastName)=>{
   console.log("Inside Contacts")
let response
 
      response=await axios.post(`http://127.0.0.1:20200/api/v1/user/contact`,{firstName:firstName,lastName:lastName},{headers: { auth: localStorage.getItem("auth") }})
  
  
return response

}
export const deleteContact = async (id) => {
 console.log(">>>>>>>>>>>>>>>>>>>>>>>>deleteContact")
  
   const response = await axios.delete(
     `http://127.0.0.1:20200/api/v1/user/contact`,
     {
       headers: { auth: localStorage.getItem("auth") },
       params: {
        id
       },
     }
   );
 
   return response;
 }
 export const updateContact = async (userObject, id) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/contact/${id}`,
    {
     
      firstName: userObject.firstName,
      lastName: userObject.lastName,
    },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};