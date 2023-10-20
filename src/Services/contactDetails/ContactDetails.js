import axios from "axios";
export const getAllContactDetails = async (filterObject, contactId) => {
  console.log("contact id ", contactId);
  const response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/contact/contactDetails/${contactId}`,
    {
      headers: { auth: localStorage.getItem("auth") },
      params: filterObject,
    }
  );
  console.log(response);
  return response;
};
