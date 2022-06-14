import React from "react";
import Main from './views/Main';
import Details from './components/Details';
import Delete from './components/Delete';
import Update from './components/Update';
import EditForm from "./components/EditForm";
import PersonForm from './components/PersonForm';
import AllProducts from "./components/AllProducts";
import {
  BrowserRouter,
  Routes,
  Route,
  Link 
} from "react-router-dom";
    
import { useParams } from "react-router";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/' element={<AllProducts/>} />
        <Route path='/delete/:id' element={<Delete/>} />
        <Route path='/update/:id' element={<Update/>} />
        <Route path='/edit/:id' element={<EditForm/>} />
        <Route path='/addPirate/' element={<PersonForm/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;