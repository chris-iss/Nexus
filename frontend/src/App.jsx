import Dashboard from "./pages/dashboard/dashboard"
import Login from "./pages/login/Login"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from "./pages/signup/SignUp"




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
