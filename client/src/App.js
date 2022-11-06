// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import FrontPage from './pages/FrontPage';
import HostCar from './pages/HostCar';
import Admin from './pages/Admin';
import CarDetails from './pages/CarDetails';
import Profile from './pages/Profile';
import 'antd/dist/antd.css';
import EditCar from './pages/EditCar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Routes element={<ProtectedRoute/>}>
            <Route path='/' exact element={<Home />} />
          </Routes> */}
          <Route path='/' exact element={<Home/>}/> 
          <Route path='/Login' exact element={<Login />} />
          <Route path='/Register' exact element={<Register />} />
          <Route path='/booking/:carid' exact element={<BookingCar />} />
          <Route path='/FrontPage' exact element={<FrontPage />} />
          <Route path='/HostCar' exact element={<HostCar />} />
          <Route path='/Admin' exact element={<Admin />} />
          <Route path='/EditCar/:carid' exact element={<EditCar/>} />
          <Route path='/CarDetails/:carid' exact element={<CarDetails/>} />
          <Route path='/Profile/:username' exact element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
    return <Route {...props} />
  }
  else {
    return <Navigate to='/Login' />
  }
}