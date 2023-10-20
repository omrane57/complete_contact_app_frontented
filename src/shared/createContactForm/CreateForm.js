import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateForm.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { createcontact } from "../../Services/Contact/createUser";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Spinner from "../spinner/Spinner";
import ErrorHandler from "../errorHandler/ErrorHandler";

const CreateContactForm = ({ handleSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [spinner,setSpinner]=useState(false)
  const handleFirstName = (e) => {
    setFirstName((prev) => e.target.value);
  };
  const handleLastName = (e) => {
    setLastName((prev) => e.target.value);
  };

  const handleFormSubmit = async (e) => {
    try {
      setSpinner((prev)=>true)
      e.preventDefault();
      if(firstName.length==0){
        throw new Error("Invalid FirstName")
      }
      if(lastName.length==0){
        throw new Error("Invalid lastName")
      }
      for(let i=0;i<lastName.length;i++){
        if(!((lastName[i]>="a"&& lastName[i]<="z")||(lastName[i]>="A"&& lastName[i]<="Z")))
      {
      throw new Error("Invalid lastName")
      }    }
      for(let i=0;i<firstName.length;i++){
        if(!((firstName[i]>="a"&& firstName[i]<="z")||(firstName[i]>="A"&& firstName[i]<="Z")))
      {
      throw new Error("Invalid FirstName")
      }    }
      const response = await createcontact(firstName, lastName);
      enqueueSnackbar("User Created Succesfully", { variant: "success" });
      handleSubmit();
    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>
    
    }
    finally{
      setSpinner((prev)=>false)
    }
  };
  return (
    <>
    {spinner&&<Spinner/>}
      <SnackbarProvider autoHideDuration={4000} />
      <label className="form-title">Contacts Registration Form</label>
      <form className="form">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            FirstName
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleFirstName}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            LastName
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"  
            onChange={handleLastName}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateContactForm;
