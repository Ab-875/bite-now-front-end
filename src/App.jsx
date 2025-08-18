import { jwtDecode } from "jwt-decode"
import { useState } from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router"
import LoginForm from "./components/Login/LoginForm"
import SignUp from "./components/Signup/SignupForm"
import LogoutButton from "./components/Login/LogoutButton"

import OrderList from "./components/OrderList/OrderList"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  function handleLogin(newToken) {
    setToken(newToken)
  }

  if(token){
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
  }

  return (
    <>
      <Router>
        <div>
        {token ? <LogoutButton onLogout={handleLogut} /> : null}
        <Routes>
          <Route path="/order" element={<OrderList />}/>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />}/>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App