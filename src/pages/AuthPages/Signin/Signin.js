import React, { useState } from 'react'
import * as S from './SigninStyle'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../../Service/AuthApi'
import { setAuthorization } from '../../../store/slices/authorizationSlice'
import { useDispatch } from 'react-redux'

export const Signin = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('Укажите почту/пароль')
      return
    }

    try {
      await loginUser({ email, password })
      dispatch(
        setAuthorization({
          access_token: 'access_token',
          refresh_token: 'refresh_token',
        })
      )

      navigate('/')
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <S.Wrapper>
      <S.ContainerEnter>
        <S.ModalBlock>
          <S.ModalFormLogin>
            <S.ModalLogo>
              <S.ModalLogoImg src="../img/logo-reg.png" alt="logo" />
            </S.ModalLogo>
            <S.ModalInputLogin
              type="text"
              name="login"
              id="formlogin"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <S.ModalInput
              type="password"
              name="password"
              id="formpassword"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
            <S.ErrorDiv>{errorMessage}</S.ErrorDiv>
            <S.ModalBtnEnter id="btnEnter" onClick={handleLogin}>
              <S.ModalBtnEnterA disabled={isLoading} onClick={handleLogin}>
                {isLoading ? 'Осуществляется вход' : 'Войти'}
              </S.ModalBtnEnterA>
            </S.ModalBtnEnter>
            <S.ModalBtnSingup id="btnSignUp">
              <S.ModalBtnSingupA href="/register">
                Зарегистрироваться
              </S.ModalBtnSingupA>
            </S.ModalBtnSingup>
          </S.ModalFormLogin>
        </S.ModalBlock>
      </S.ContainerEnter>
    </S.Wrapper>
  )
}
