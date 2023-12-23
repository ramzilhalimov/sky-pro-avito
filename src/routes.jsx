import { Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPages/Login/Login'
import ProfilePages from './pages/ProfilePages/ProfilePages'
import SellerProfilePages from './pages/SellerProfilePages/SellerProfilePages'
import MainPages from './pages/MainPages/MainPages'
import AdvPages from './pages/AdvPages/AdvPages'
import Registration from './pages/AuthPages/Register/Register'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={MainPages} />
      <Route exact path="/register" Component={Registration} />
      <Route exact path="/login" Component={Login} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/profile" Component={ProfilePages} />
      </Route>
      <Route exact path="/sellerProfile" Component={SellerProfilePages} />
      <Route path="/ad/:adId" Component={AdvPages} />
    </Routes>
  )
}

export default AppRoutes
