import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddModal from '../Modal/AddModal/AddModal'
import * as S from './FooterStyle'

const Footer = ({ data }) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <S.Footer>
      <S.FooterContainer>
        <S.FooterImg
          onClick={() => {
            navigate('/')
          }}
        >
          <a href="" target="_self">
            <S.FooterImgImg src="/img/footer1.svg" alt="home" />
          </a>
        </S.FooterImg>
        <S.FooterImg
          onClick={(e) => {
            e.preventDefault()
            setIsModalOpen(true)
          }}
        >
          <a href="" target="_self">
            <S.FooterImgImg src="/img/footer2.png" alt="add-modal" />
          </a>
        </S.FooterImg>
        <S.FooterImg
          onClick={() => {
            navigate('/profile')
          }}
        >
          <a href="" target="_self">
            <S.FooterImgImg src="/img/footer3.svg" alt="profile" />
          </a>
        </S.FooterImg>
        {isModalOpen && (
          <AddModal data={data} onClose={() => setIsModalOpen(false)} />
        )}
      </S.FooterContainer>
    </S.Footer>
  )
}

export default Footer
