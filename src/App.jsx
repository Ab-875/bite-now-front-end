import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import MenuList from "./components/MenuList/MenuList"
import OrderList from "./components/OrderList/OrderList"
import LoginForm from "./components/Login/LoginForm"
import SignUp from "./components/Signup/SignupForm"
import Navbar from "./Components/NavBar/NavBar"
import MenuAdmin from "./Components/MenuForm/MenuAdmin"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  function handleLogout() {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (token) setUser(jwtDecode(token))
    else setUser(null)
  }, [token])

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <button onClick={handleLogout}>Logout</button>
      <Navbar />
      <Routes>
        <Route path="/menu" element={<MenuList token={token} />} />
        <Route path="/order" element={<OrderList token={token} />} />
        {user?.role === "owner" && (
          <Route path="/owner/menu" element={<MenuAdmin token={token} />} />
        )}
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </Router>
  )
}

export default App
