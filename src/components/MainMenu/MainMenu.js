import { useNavigate } from 'react-router-dom'
import * as S from './MainMenuStyle'

const MainMenu = () => {
  const navigate = useNavigate()

  return (
    <S.MainMenu>
      <S.MenuLogoLink href="" target="_blank">
        <S.MenuLogoImg src="../img/logo.png" alt="logo" />
      </S.MenuLogoLink>
      <S.MenuForm action="#">
        <S.MenuBtn onClick={() => navigate('/')}>
          Вернуться на главную
        </S.MenuBtn>
      </S.MenuForm>
    </S.MainMenu>
  )
}

export default MainMenu
