
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SignIn from './components/Login';
import SignUp from './components/SignUp';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Alert from './components/Alert';
import SuccessLogin from './components/SuccessLogin';



function App() {
  const [alert,setAlert] = useState(
    {
        open:false,
        message:"",
        type:"success",
    })

  return (
  
     <Router>
    <div className="App">
       <Header />
    <Routes>
        
        <Route path="/" element={<SignIn setAlert={setAlert}/>}/>
         <Route path="/sign-up" element={<SignUp setAlert={setAlert}/>}/> 
         <Route path="/success-login" element={<SuccessLogin/>}/>
     
      </Routes>
        
   <Alert alert ={alert} setAlert={setAlert} />
   
  </div> 
       </Router> 
  );
}

export default App

  
  

