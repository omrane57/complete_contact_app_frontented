import axios from "axios";
export const GetAllContact = async (filterObject) => {
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/user/contact`, {
    headers: { auth: localStorage.getItem("auth") },
    params:filterObject
  });
  console.log(response)
  return response;
};