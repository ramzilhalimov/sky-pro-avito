import { useNavigate } from 'react-router-dom'
import * as S from './HeaderStyle'
import AddModal from '../Modal/AddModal/AddModal'
import { useState } from 'react'

const Header = ({ data, profileKey, Authorization }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const Logut = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <S.Header>
      <S.HeaderNav>
        <S.Logo>
          <S.LogoMobLink>
            <S.LogoMobImg src="/img/logo-mob.png" alt="logo" />
          </S.LogoMobLink>
        </S.Logo>
        {profileKey ? (
          <>
            <S.HeaderBtnPutAd
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
            >
              Разместить объявление
            </S.HeaderBtnPutAd>
            <S.HeaderBtnLk onClick={Logut}>Выйти</S.HeaderBtnLk>
          </>
        ) : Authorization ? (
          <>
            <S.HeaderBtnPutAd
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
            >
              Разместить объявление
            </S.HeaderBtnPutAd>
            <S.HeaderBtnLk
              onClick={() => {
                navigate('/profile')
              }}
            >
              Личный кабинет
            </S.HeaderBtnLk>
          </>
        ) : (
          <S.HeaderBtnLkEnter
            onClick={() => {
              navigate('/login')
            }}
          >
            Вход в личный кабинет
          </S.HeaderBtnLkEnter>
        )}
      </S.HeaderNav>
      {isModalOpen && (
        <AddModal data={data} onClose={() => setIsModalOpen(false)} />
      )}
    </S.Header>
  )
}

export default Header
