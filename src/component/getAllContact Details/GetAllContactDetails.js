import React, { useEffect, useState } from "react";

import Table from "../../shared/Table";
import { Pagination, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Authorize, authorize } from "../../Services/user/Authorize";
import NavbarShared from "../../shared/navbar/Navbar";
import CreateForm from "../../shared/createform/CreateForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import {GetAllContactDetails } from "../../Services/contactDetails/ContactDetails";
import CreateContactForm from "../../shared/createContactForm/CreateForm";
import { deleteContact, updateContact } from "../../Services/Contact/createUser";
import { enqueueSnackbar } from "notistack";
import CreateContactDetailsForm from "../../shared/createContactDetails/CreateForm";
import { getAllContactDetails } from "../../Services/contactDetails/ContactDetails";
import { deleteContactDetails, updateContactDetails } from "../../Services/contactDetails/createUser";
import ErrorHandler from "../../shared/errorHandler/ErrorHandler";
const GetAllContactDetails = () => {
  const navigate=new useNavigate()
  
  const { ids } = useParams();
  const [isReset,setIsReset]=useState(false)
  const [flag,setflag]=useState(false)
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [usernames, setUsernames] = useState();
  const [type, settype] = useState();
  const [contactNumber, setcontactNumber] = useState();
  const [typeForFilter,settypeForFilters]=useState("")
  const [contactNumberForFilter,setcontactNumberForFilters]=useState("")

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
 

  const handletype = (e) => {
    settype(e.target.value);
  };
  const handlecontactNumber = (e) => {
    setcontactNumber(e.target.value);
  };
  const updateParticularContact = async () => {
    try {
      setSpinner((Prev)=>true)
    const object = {
  
      type:type,
      contactNumber:contactNumber,
    };
    const response = await updateContactDetails(object, id);
    if(response.data=="Contact Details Updated Successfully"){
     
       <ErrorHandler type={"success"} message={"Contact Details Updated Successfully"}/>
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
    settype((prev) => data.type);
    setcontactNumber((prev) => data.contactNumber);
    setid((prev) => data.id);
    setShow((prev) => true);

    // Navigate('/updateUser/${d.id}')
  };
  const handleUserdelete=async(data)=>{
   
   
   console.log(data.id)
    const response=await deleteContactDetails(data.id)
    if(response.status==200){
      alert("User Deleted Successfully")
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
    if(flag){
      
      if(typeForFilter.length==0 && contactNumberForFilter.length==0){
        throw new Error("Invalid Filter Options")
      }
    }
    const filterObject = {
      type: typeForFilter,
      contactNumber: contactNumberForFilter,
      limit: limit,
      page: page,
    };
    const response =await getAllContactDetails(filterObject,ids)
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
  const handleView=async(data)=>{
   console.log("hello")
    navigate(`/allContactDetails`)
  }
  const handleReset=()=>{
    setIsReset((prev)=>!prev)
    settypeForFilters((prev)=>"")
    setcontactNumberForFilters((prev)=>"")
  
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
                 Type
                </label>
                <input
                  type="text"
                  value={type}
                  class="form-control"
                  onChange={handletype}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  ContactNumber
                </label>
                <input
                  type="text"
                  value={contactNumber}
                  class="form-control"
                  onChange={handlecontactNumber}
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
      <NavbarShared username={localStorage.getItem("username")} reset={true}  />
      <CreateContactDetailsForm  handleSubmit={handleSubmit} id={ids}/>
     
      <br></br>
      <label htmlFor="">{count}</label>
      <br />
      <form style={{display:"flex", justifyItems:"center" ,marginLeft:"30rem",marginBottom:"5rem",color:"rgb(85, 174, 194)"}}>
        <label  value={typeForFilter}>Type</label>
        <input type="text"  onChange={(e) => {
           settypeForFilters(e.target.value)
          }} />
        <br/>
        <label style={{marginLeft:"2rem"}}>Contact Number</label>
        <input onChange={(e)=>setcontactNumberForFilters(e.target.value)} value={contactNumberForFilter} style={{marginRight:"2rem"}} type="text" />
        <button type="button" class="btn btn-success"   onClick={(e) => {
            setPage((prev) => 1);
            setflag((prev)=>true)
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
       
      
      />
    </>
  );
};

export default GetAllContactDetails;
