import { jwtDecode } from "jwt-decode"
import { useState } from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router"
import LoginForm from "./components/Login/LoginForm"
import SignUp from "./components/Signup/SignupForm"
import LogoutButton from "./components/Login/LogoutButton"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  function handleLogin(newToken) {
    setToken(newToken)
  }

  return (
    <>

    </>
  )
}

export default App