import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { logout } from '../../Services/user/logout';
import { useState } from 'react';
import { resetUser } from '../../Services/user/Users';
import { enqueueSnackbar } from 'notistack';
import ErrorHandler from '../errorHandler/ErrorHandler';
const NavbarShared= ({username,reset})=> {
  const [show, setShow] = useState(false);
  const [model,setModel]  =useState() 
  const [oldPassword,setOldPassword]=useState("")
  const [newPassword,setNewPassword]=useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

    const navigate= useNavigate()
    const handleOldPassword=(e)=>{
      setOldPassword((prev)=>e.target.value)
    }
    const handleNewPassword=(e)=>{
      setNewPassword((prev)=>e.target.value)
    }
   const handleReset=async()=>{
try {
  if(oldPassword.length==0){
    throw Error("Invalid OldPassword")
  }
  if(newPassword.length==0){
    throw Error("Invalid NewPassword")
  }
  const userObject={
    oldPassword:oldPassword,
    newPassword:newPassword,
    username:localStorage.getItem("username")
  }
  const userId=localStorage.getItem("id")
  const response=await resetUser(userObject,userId)
  handleClose()    
} catch (error) {
  <ErrorHandler type={"error"} message={error}/>
}
    
   }
   const handleLogout=async()=>{
    const response =await logout() 
    console.log(response.data)
    
const itemCount = localStorage.length;

const keys = [];


for (let i = 0; i < itemCount; i++) {
  const key = localStorage.key(i);
  keys.push(key);
}

for (let i = 0; i <keys.length; i++) {
    localStorage.removeItem(keys[i])
    
  }
    navigate(`/`)
   
   }
  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Old Password
                </label>
                <input
                  type="text"
                  value={oldPassword}
                  class="form-control"
                  onChange={handleOldPassword}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Current Password
                </label>
                <input
                  type="text"
                  value={newPassword}
                  class="form-control"
                  onChange={handleNewPassword}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleReset} variant="primary">
              Reset
            </Button>
          </Modal.Footer>
        </Modal>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">{username}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button  className="logout"type="submit" onClick={handleLogout}>Logout</Button>
    {reset&&<Button  className="logout"type="submit" onClick={handleShow}>Reset</Button>}
      

    </Navbar>
    </>
  );
}

export default NavbarShared;