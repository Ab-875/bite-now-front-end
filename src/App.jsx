
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router"
import LoginForm from "./components/Login/LoginForm"
import SignUp from "./components/Signup/SignupForm"
import LogoutButton from "./components/Login/LogoutButton"
import OrderList from "./components/OrderList/OrderList"
import Cart from "./components/Cart/Cart"


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  function handleLogin(newToken) {
    setToken(newToken)
  }

  const handleLogout = (token) => {
    localStorage.setItem("token", token)
    setToken(null)
    setUser(null)
    setCartItems([])
  }

  if (token) {
    const decodedToken = jwtDecode(token)
    setUser(decodedToken)
    console.log(decodedToken)
  } else {
    setUser(null)
  }

  if (!token) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </>
    )
  }

  return (
    <>

      <Router>
        <LogoutButton onLogout={handleLogout} />
        {user?.role === "customer"
          ?
          <Routes>
            <Route path="/menu"
              element={<MenuList token={token} />}
              onAddToCart={(item) => { setCartItems([...cartItems, item]) }}
            />
            <Route path="*" element={<Navigate to="/menu" />} />
          </Routes>
          :
          null
        }

        {user?.role === "owner"
        ?
        <Routes>
          <Route path="/orders" element={<OrderList token={token} />}/>
          <Route path="*" element={<Navigate to="/order" />} />
        </Routes>
        :
        null
        }
      </Router>
    </>
  )
}

export default App