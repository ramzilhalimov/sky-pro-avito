import { useState } from 'react'
import * as S from './RegisterStyle'
import { registerUser } from '../../../components/Api/api'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [surname, setSurname] = useState('')
  const [city, setCity] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email || !password || !repeatPassword) {
      setErrorMessage('Заполните обязательные поля')
      return
    }
    if (password !== repeatPassword) {
      setErrorMessage('Пароли не совпадают')
      return
    }
    if (password.length < 8 || repeatPassword.length < 8) {
      setErrorMessage('Пароль должен содержать более 4 символов')
      return false
    }

    try {
      await registerUser(email, password, name, surname, city)
      console.log('Registration successful:', response)
      navigate('/login')
    } catch (error) {
      console.log('Registration error:', error)
      setErrorMessage(error.message)
    }
  }

  return (
    <S.Wrapper>
      <S.ContainerSignup>
        <S.ModalBlock>
          <S.ModalFormLogin onSubmit={handleRegister}>
            <S.ModalLogo>
              <S.ModalLogoImg src="../img/logo-reg.png" alt="logo" />
            </S.ModalLogo>

            <S.ModalInput
              type="text"
              name="login"
              id="loginReg"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <S.ModalInput
              type="password"
              name="password"
              id="passwordFirst"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
            <S.ModalInput
              type="password"
              name="password"
              id="passwordSecond"
              placeholder="Повторите пароль"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <S.ModalInput
              type="text"
              name="first-name"
              id="first-name"
              placeholder="Имя (необязательно)"
              onChange={(e) => setName(e.target.value)}
            />
            <S.ModalInput
              type="text"
              name="first-last"
              id="first-last"
              placeholder="Фамилия (необязательно)"
              onChange={(e) => setSurname(e.target.value)}
            />
            <S.ModalInput
              type="text"
              name="city"
              id="city"
              placeholder="Город (необязательно)"
              onChange={(e) => setCity(e.target.value)}
            />
            <S.ErrorDiv>{errorMessage}</S.ErrorDiv>

            <S.ModalBtnSignupEnt>
              <S.ModalBtnLink>Зарегистрироваться</S.ModalBtnLink>
            </S.ModalBtnSignupEnt>
          </S.ModalFormLogin>
        </S.ModalBlock>
      </S.ContainerSignup>
    </S.Wrapper>
  )
}

export default Registration
