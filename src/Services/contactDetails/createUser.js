import axios from "axios"
export  const  createContactDetails=async(contactId,type,contactNumber)=>{
   console.log("Inside Contacts Details")
let response
 
      response=await axios.post(`http://127.0.0.1:20200/api/v1/user/contact/contactDetails`,{contactId:contactId,type:type,contactNumber:contactNumber},{headers: { auth: localStorage.getItem("auth") }})
  
  
return response

}
export const deleteContactDetails = async (id) => {
 console.log(">>>>>>>>>>>>>>>>>>>>>>>>deleteContactdetails",id)
  
   const response = await axios.delete(
     `http://127.0.0.1:20200/api/v1/user/contact/contactDetails`,
     {
       headers: { auth: localStorage.getItem("auth") },
       params: {
        id
       },
     }
   );
 
   return response;
 }
 export const updateContactDetails = async (userObject, id) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/contact/contactDetails/${id}`,
    {
     
      type: userObject.type,
      contactNumber: userObject.contactNumber,
    },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};