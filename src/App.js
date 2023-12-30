// import { useEffect, useRef } from 'react'
import * as S from './App.styled'
import AppRoutes from './routes'
// import { useRefreshTokenMutation } from './Service/AdsApi'

function App() {
  // const [refreshToken] = useRefreshTokenMutation()
  // const refreshingToken = useRef(false)

  // const handleRefreshToken = async () => {
  //   if (refreshingToken.current) {
  //     return
  //   }
  //   refreshingToken.current = true
  //   try {
  //     const response = await refreshToken({
  //       access_token: localStorage.getItem('access_token'),
  //       refresh_token: localStorage.getItem('refresh_token'),
  //     })
  //   } catch (error) {
  //     console.error('Error refreshing token:', error)
  //     // Обработка ошибки обновления токена
  //   } finally {
  //     refreshingToken.current = false
  //   }
  // }

  // useEffect(() => {
  //   handleRefreshToken()
  //   const interval = setInterval(() => {
  //     handleRefreshToken()
  //   }, 120000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <S.MainApp>
      <AppRoutes />
    </S.MainApp>
  )
}

export default App
