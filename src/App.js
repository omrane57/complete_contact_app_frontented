import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import GetAllUser from "./component/getAllUser/GetAllUser";
import { Pagination } from "react-bootstrap";
import GetAllContacts from "./component/getAllContact/GetAllContact";
import GetAllContactDetails from "./component/getAllContact Details/GetAllContactDetails";


function App() {
  return (
    // <div className="App">
    <Routes>
    <Route exact path={'/'} element={<Login/>} > </Route>
    <Route exact path={`/allUsers`} element={<GetAllUser/>} > </Route>
    <Route exact path={`/user`} element={<GetAllContacts/>} > </Route>
    <Route exact path={`/allContactDetails/:ids`} element={<GetAllContactDetails/>} > </Route>

    {/* <Route exact path={`/yr`} element={<Pagination/>} > </Route> */}
    
     {/* <Login/>
     <GetAllUser/> */}
    {/* // </div> */}
    </Routes>
  );
}

export default App;
