import React, { useEffect, useState } from "react";
import {
  deleteUser,
  GetAllUsers as getEveryUsers,
  updateUser,
} from "../../Services/user/Users";
import Table from "../../shared/Table";
import { Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Authorize, authorize } from "../../Services/user/Authorize";
import NavbarShared from "../../shared/navbar/Navbar";
import CreateForm from "../../shared/createform/CreateForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SnackbarProvider, EnqueueSnackbar, enqueueSnackbar } from "notistack";
import Spinner from "../../shared/spinner/Spinner";
import ErrorHandler from "../../shared/errorHandler/ErrorHandler";
const GetAllUser = () => {
  const [spinner, setSpinner] = useState(false);
  const [isReset,setIsReset]=useState(false)
  const { username } = useParams();
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [usernames, setUsernames] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [id, setid] = useState();
  const [firstNameForFilters, setFirstNameForFilters] = useState("");
  const [lastNameForFilters, setLastNameForFilters] = useState("");
  const [usernameForFilters, setUsernameForFilters] = useState("");
  const [isAdminForFilters, setisAdminForFilters] = useState("");
  const [idForFilters, setIdForFilters] = useState("");
  const [object, setObject] = useState({});
  const [del,setDel]=useState(false)
  const [flag,setflag]=useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isLogin, setIsLogin] = useState(false);
  const handleUnAuthorize = async () => {
    const response = await authorize();
    setIsLogin(response.data.result);
  };
  useEffect(() => {
    handleUnAuthorize();
  }, []);
  useEffect(() => {
    if (isLogin) {
      handleSubmit();
    }
  }, [limit, page, isLogin,isReset,del]);
  useEffect(() => {
    if (isLogin) {
      <ErrorHandler type={"success"} message={"Login SuccessFul"}/>

    }
  }, [isLogin]);
  const handleUsername = (e) => {
    setUsernames(e.target.value);
  };

  const handleFirstName = (e) => {
    setfirstName(e.target.value);
  };
  const handlelastname = (e) => {
    setlastName(e.target.value);
  };
  const updateParticularUser = async () => {
    try {
      setSpinner((prev) => true);
      const object = {
        username: usernames,
        firstName: firstName,
        lastName: lastName,
      };
      if(usernames.length==0 ){
        throw new Error("Invalid Username")
      }
      if(firstName.length==0){
        throw new Error("Invalid FirstName")
      }
      if(lastName.length==0){
        throw new Error("Invalid LastName")
      }
    
      const response = await updateUser(object, id);
      <ErrorHandler type={"success"} message={`${firstName} has Been Updated SuccessFully`}/>

      if (response.data == "UserUpdated Successfully") {
       
        handleSubmit();
        handleClose();
      }
    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>
    } finally {
      setSpinner((prev) => false);
    }
  };
  const handleSubmit = async () => {
  try {
    if(flag){
      if(firstNameForFilters.length==0 && lastNameForFilters.length==0 && usernameForFilters.length==0){
        throw new Error("Invalid Filter Options")
      }
    }
    let adminFilter;
    if (isAdminForFilters == "true") {
      adminFilter = true;
    }
    if (isAdminForFilters == "false") {
      adminFilter = false;
    }
    const filterObject = {
      firstName: firstNameForFilters,
      lastName: lastNameForFilters,
      isAdmin: adminFilter,

      username: usernameForFilters,
      limit: limit,
      page: page,
    };
    console.log(filterObject)
    
    const response = await getEveryUsers(filterObject);
    setData((prev) => response.data);
    console.log(response.data)
    setCount((prev) => response?.headers["x-total-count"]);
  } catch (error) {
    // enqueueSnackbar(error.message,{variant:"error"})
    <ErrorHandler type={"error"} message={error}/>

  }
  finally{
    if(flag){
      setflag((prev)=>false)
    }
  }
  };
  const handleUserUpdate = (data) => {
    try {
      setSpinner((prev) => true);
      setUsernames((prev) => data.username);
      setfirstName((prev) => data.firstName);
      setlastName((prev) => data.lastName);
      setid((prev) => data.id);
      setShow((prev) => true);
    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>

    } finally {
      setSpinner((prev) => false);
    }

    // Navigate('/updateUser/${d.id}')
  };
  const handleUserdelete = async (data) => {
    try {
      setDel((prev)=>true)
      const response = await deleteUser(data.id);
      if (response.status == 200) {
        
  
        handleSubmit();
      }

      <ErrorHandler type={"success"} message={`${data.firstName} has been Deleted SuccessFully`}/>

    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>

    } 
    finally{
      setDel((prev)=>false)
    }
  
  };

  if (!isLogin) {
    return (
      <h1>
        <a href="/">Please Login</a>
      </h1>
    );
  }
  const handleReset=()=>{
    setIsReset((prev)=>!prev)
    setFirstNameForFilters((prev)=>"")
    setLastNameForFilters((prev)=>"")
    setUsernameForFilters((prev)=>"")
    handleSubmit()
  }
  return (
    <>
      {spinner && <Spinner />}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  UserName
                </label>
                <input
                  type="email"
                  value={usernames}
                  class="form-control"
                  aria-describedby="emailHelp"
                  onChange={handleUsername}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  FirstName
                </label>
                <input
                  type="text"
                  value={firstName}
                  class="form-control"
                  onChange={handleFirstName}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  LastName
                </label>
                <input
                  type="text"
                  value={lastName}
                  class="form-control"
                  onChange={handlelastname}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateParticularUser}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <SnackbarProvider autoHideDuration={4000} />

      <NavbarShared username={localStorage.getItem("username")} reset={true}/>
      <CreateForm handleSubmit={handleSubmit} />
      <br></br>
      <label htmlFor="">{count}</label>
      <br />
      <form action="" style={{ display: "flex", marginBottom: "10px",marginLeft:"150px" }}>
       
        <label>UserName</label>
        <input
          type="text"
          value={usernameForFilters}
          onChange={(e) => {
            setUsernameForFilters((prev) => e.target.value);
          }}
        ></input>
        <label>firstName</label>
        <input
          type="text"
          value={firstNameForFilters}
          onChange={(e) => {
            setFirstNameForFilters((prev) => e.target.value);
          }}
        ></input>
        <label>lastName</label>
        <input
          type="text"
          value={lastNameForFilters}
          onChange={(e) => {
            setLastNameForFilters((prev) => e.target.value);
          }}
        ></input>
        <label>IsAdmin</label>

        <select
          class="form-select"
          style={{ width: "25%", borderRadius: "10px" }}
          aria-label="Default select example"
          onClick={(e) => setisAdminForFilters((prev) => e.target.value)}
        >
          <option value={true}>True</option>
          <option value={true}>False</option>
        </select>
        <button
          type="button"
          onClick={(e) => {
            setflag((prev)=>true)
            setPage((prev) => 1);
            handleSubmit();
          }}
          class="btn btn-info"
        >
          Submit
        </button>
        
        <button type="button" class="btn btn-info" onClick={handleReset}>Reset</button>
      </form>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        update={true}
        deleteUser={true}
        updateFunction={handleUserUpdate}
        handleUserUpdate={handleUserUpdate}
        handleUserdelete={handleUserdelete}
        setShow={setShow}
        firstNameForFilters={setFirstNameForFilters}
        lastNameForFilters={setLastNameForFilters}
        usernameForFilters={setUsernameForFilters}
        isAdminForFilters={setisAdminForFilters}
        idForFilters={setIdForFilters}
       
      />
    </>
  );
};

export default GetAllUser;
