import axios from "axios";
export const GetAllUsers = async (filterObject) => {
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/user`, {
    headers: { auth: localStorage.getItem("auth") },
    params: filterObject,
  });
  return response;
};
export const updateUser = async (userObject, id) => {
  console.log(id, "...............");
  console.log(userObject, "...................");
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${id}`,
    {
      username: userObject.username,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
    },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const deleteUser = async (id) => {
  console.log(id, "...............");
 
  const response = await axios.delete(
    `http://127.0.0.1:20200/api/v1/user`,
    {
      headers: { auth: localStorage.getItem("auth") },
      params: {
       id
      },
    }
  );

  return response;
}
export const resetUser = async (userObject,userId) => {
  console.log(userObject, "...............");
 
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/reset/admin`,userObject,
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
}