import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateForm.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { createcontact } from "../../Services/Contact/createUser";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Spinner from "../spinner/Spinner";
import { createContactDetails } from "../../Services/contactDetails/createUser";
import ErrorHandler from "../errorHandler/ErrorHandler";

const CreateContactDetailsForm = ({ handleSubmit,id }) => {
  const [type, settype] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [spinner,setSpinner]=useState(false)
  const handletype = (e) => {
    settype((prev) => e.target.value);
  };
  const handlecontactNumber = (e) => {
    setcontactNumber((prev) => e.target.value);
  };

  const handleFormSubmit = async (e) => {
    try {
      setSpinner((prev)=>true)
      e.preventDefault();
      if(type.length==0){
        throw new Error("Invalid Type")
      }
      if((contactNumber.length !=10)){
        throw new Error("Invalid Contact Number")
      }
      for(let i=0;i<type.length;i++){
        if(!((type[i]>="a"&& type[i]<="z")||(type[i]>="A"&& type[i]<="Z")))
      {
      throw new Error("Invalid Type")
      }    }
      for(let i=0;i<contactNumber.length;i++){
        if(!(contactNumber[i]>=0&& contactNumber[i]<=9))
      {
      throw new Error("Invalid Contact Number")
      }    }
      const response = await createContactDetails(id,type,contactNumber);
    enqueueSnackbar(`$Contact Details of type ${type} Has Been Added To Contact Details List`,{variant:"success"})
      setcontactNumber((prev) => e.target.value);
     settype((prev) => e.target.value);

      handleSubmit();
    } catch (error) {
      <ErrorHandler type={"error"} message={error}/>
      
    }
    finally{
      setSpinner((prev)=>false)
      setcontactNumber((prev) =>"");
      settype((prev)=>"")
    }
  };
  return (
    <>
    {spinner&&<Spinner/>}
      <SnackbarProvider autoHideDuration={4000} />
      <label className="form-title">Contacts Details Registration Form</label>
      <form className="form">
        <div class="mb-3">
          <label class="form-label">
           Type
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handletype}
            value={type}
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handlecontactNumber}
            value={contactNumber}
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

export default CreateContactDetailsForm;
