import Dashboard from "./pages/dashboard/dashboard"
import Login from "./pages/login/Login"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from "./pages/signup/SignUp"
import Profile from "./pages/profile/Profile"
import Orders from "./pages/orders/Orders"
import Payments from "./pages/payments/Payments"




function App() {

  return (
    <>
      <Router>
        <Routes>
         <Route path="/" element={<Navigate replace to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
