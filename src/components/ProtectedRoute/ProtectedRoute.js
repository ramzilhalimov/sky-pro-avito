import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { setAuthorization } from '../../store/slices/authorizationSlice'

export const ProtectedRoute = ({ redirectPath = '/' }) => {
  const userToken = useSelector((state) => state.authorization.access_token)
  const dispatch = useDispatch()

  if (!userToken) {
    const newAccessToken = 'новый_access_token'
    const newRefreshToken = 'новый_refresh_token'

    dispatch(
      setAuthorization({
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      })
    )

    return <Navigate to={redirectPath} replace={true} />
  }

  return <Outlet />
}
