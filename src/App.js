import AdminRegistration from './components/admin/AdminRegistration';
import Dashboard from './components/user/Dashboard';
import Login from './components/user/Login';
import Signup from './components/user/Register';
import GenerateWallet from './utils/GenerateWallet';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element ={<Signup/>} />
          <Route path="/register" element ={<Signup/>} />
          <Route path="/adminregister" element ={<AdminRegistration/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/dashboard" element ={<Dashboard/>} />
          <Route path="/generate-wallet" element={<GenerateWallet />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App