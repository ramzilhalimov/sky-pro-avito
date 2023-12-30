import { Route, Routes } from 'react-router-dom'
import Signin from './pages/AuthPages/Signin/Signin'
import ProfilePages from './pages/ProfilePages/ProfilePages'
import SellerProfilePages from './pages/SellerProfilePages/SellerProfilePages'
import MainPages from './pages/MainPages/MainPages'
import AdvPages from './pages/AdvPages/AdvPages'
import Signup from './pages/AuthPages/Signup/Signup'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={MainPages} />
      <Route exact path="/register" Component={Signup} />
      <Route exact path="/login" Component={Signin} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/profile" Component={ProfilePages} />
      </Route>
      <Route exact path="/sellerProfile/:id" Component={SellerProfilePages} />
      <Route path="/ad/:id" Component={AdvPages} />
    </Routes>
  )
}

export default AppRoutes
