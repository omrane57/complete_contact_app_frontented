import React, { useEffect, useState } from "react";

import Table from "../../shared/Table";
import { Pagination, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Authorize, authorize } from "../../Services/user/Authorize";
import NavbarShared from "../../shared/navbar/Navbar";
import CreateForm from "../../shared/createform/CreateForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GetAllContact } from "../../Services/Contact/Contact";
import CreateContactForm from "../../shared/createContactForm/CreateForm";
import { deleteContact, updateContact } from "../../Services/Contact/createUser";
import { enqueueSnackbar } from "notistack";
import ErrorHandler from "../../shared/errorHandler/ErrorHandler";

const GetAllContacts = () => {
  const navigate=new useNavigate()
  const [flag,setflag]=useState(false)
  const { username } = useParams();
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [usernames, setUsernames] = useState();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [firstNameForFilter,setFirstNameForFilters]=useState("")
  const [lastNameForFilter,setLastNameForFilters]=useState("")
  const [isReset,setIsReset]=useState(false)
  const [id, setid] = useState();
  const [spinner,setSpinner]=useState(false)
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
    if (isLogin) handleSubmit();
  }, [limit, page, isLogin,isReset]);
 

  const handleFirstName = (e) => {
    setfirstName(e.target.value);
  };
  const handlelastname = (e) => {
    setlastName(e.target.value);
  };
  const updateParticularContact = async () => {
    try {
      setSpinner((Prev)=>true)
    const object = {
  
      firstName:firstName,
      lastName:lastName,
    };
    if(firstName.length==0){
      throw new Error("Invalid FirstName")
    }
    if(lastName.length==0){
      throw new Error("Invalid LastName")
    }
    const response = await updateContact(object, id);
    if(response.data=="Contact Updated Successfully"){
      <ErrorHandler type={"success"} message={"Contact Updated Successfully"}/>

      handleSubmit()
      handleClose();
    }
    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>

    }
    finally{
     setSpinner((prev)=>false)
    }
  };

  const handleUserUpdate = (data) => {
    console.log(data)
    setfirstName((prev) => data.firstName);
    setlastName((prev) => data.lastName);
    setid((prev) => data.id);
    setShow((prev) => true);

    // Navigate('/updateUser/${d.id}')
  };
  const handleUserdelete=async(data)=>{
   

   
    const response=await deleteContact(data.id)
    if(response.status==200){
     
      <ErrorHandler type={"success"} message={"User Deleted Successfully"}/>

      handleSubmit()
    } 
  }
  // const handleSubmit = async () => {
  //   // e.preventDefault();
  //   const response = await GetAllContact(limit,page)

  //   setCount((prev) => response?.headers["x-total-count"]);

  //   // setData(response.data)
  //   setData((prev) => response.data);
  // };
  if (!isLogin) {
    return (
      <h1>
        <a href="/">Please Login</a>
      </h1>
    );
  }
  const handleSubmit = async () => {
    try {
      
    const filterObject = {
      firstName: firstNameForFilter,
      lastName: lastNameForFilter,
      limit: limit,
      page: page,
    };
    if(flag){
      if(firstNameForFilter.length==0 && lastNameForFilter.length==0){
        throw new Error("Invalid Filter Options")
      }
    }
    const response = await GetAllContact(filterObject);
    setData((prev) => response.data);
    setCount((prev) => response?.headers["x-total-count"]);
    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>
      
    }
    finally{
      if(flag){
        setflag((prev)=>false)
      }
    }
  };
  const handleView=(data)=>{
try {
  setSpinner((prev)=>true)
  console.log(data)
  setid((prev)=>data.id)
  navigate(`/allContactDetails/${data.id}`)
  
} catch (error) {
  <ErrorHandler type={"error"} message={error}/>

}
finally{
  setSpinner((prev)=>false)
 
}
 
  }
  const handleReset=()=>{
    setIsReset((prev)=>!prev)
    setFirstNameForFilters((prev)=>"")
    setLastNameForFilters((prev)=>"")
  
    handleSubmit()
  }
  return (
    <>
    {spinner&&<Spinner/>}
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
            <Button variant="primary" onClick={updateParticularContact}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <NavbarShared username={localStorage.getItem("username")} reset={true}/>
      <CreateContactForm handleSubmit={handleSubmit}/>
      <br></br>
      <label htmlFor="">{count}</label>
      <br />
      <form style={{display:"flex", justifyItems:"center" ,marginLeft:"30rem",marginBottom:"5rem",color:"rgb(85, 174, 194)"}}>
        <label  value={firstNameForFilter}>FirstName</label>
        <input type="text"  onChange={(e) => {
           setFirstNameForFilters(e.target.value)
          }} />
        <br/>
        <label style={{marginLeft:"2rem"}}>LastName</label>
        <input onChange={(e)=>setLastNameForFilters(e.target.value)} value={lastNameForFilter} style={{marginRight:"2rem"}} type="text" />
        <button type="button" class="btn btn-success"   onClick={(e) => {
            setflag((prev)=>true)
            setPage((prev) => 1);
            handleSubmit();
          }}>Submit</button>
        <button type="button" class="btn btn-info" onClick={handleReset}>Reset</button>

      </form>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        setShow={setShow}
        deleteUser={true}
        update={true}
        handleUserdelete={handleUserdelete}
        updateFunction={handleUserUpdate}
        handleUserUpdate={handleUserUpdate}
        view={true}
        handleView={handleView}
      />
    </>
  );
};

export default GetAllContacts;
