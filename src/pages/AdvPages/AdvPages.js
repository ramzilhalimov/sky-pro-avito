import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetAdsIdQuery,
  useGetAllCurrentUserCommentsQuery,
  useDelAdsIdMutation,
} from '../../Service/AdsApi'
import * as S from './AdvPagesStyle'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import MainMenu from '../../components/MainMenu/MainMenu'
import { useState, useEffect } from 'react'
import { ReviewsModal } from '../../components/Modal/ReviewsModal/ReviewsModal'
import EditModal from '../../components/Modal/EditModal/EditModal'

const AdvPages = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenReviews, setIsModalOpenReviews] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [phone, setPhone] = useState(false)
  const [adComments, setAdComments] = useState([])
  const [deleted, setDeleted] = useState(false)
  const { adId } = useParams()
  const { data: advComments } = useGetAllCurrentUserCommentsQuery(adId)

  const handlePhoneClick = () => {
    setPhone(true)
  }

  const [DeteleAds] = useDelAdsIdMutation(adId)
  useEffect(() => {
    if (advComments) {
      setAdComments(advComments)
    }
  }, [advComments])

  let showEdit = false
  const { data, isLoading } = useGetAdsIdQuery(adId)

  const imageUrls = data?.images?.map(
    (image) => `http://127.0.0.1:8090/${image.url}`
  )

  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
  }
  const currentUser = localStorage.getItem('id_user')
  if (isLoading || !data) return <div>идет загрузка</div>
  const token = localStorage.getItem('access_token')
  const Authorization = !!token

  if (Authorization) {
    localStorage.setItem('id_seller', data.user.id)
  }
  if (data.user.id === parseInt(currentUser, 10)) {
    showEdit = true
  }
  const DeleteAtdFunc = async () => {
    setDeleted(true)
    DeteleAds({ adId: adId })
    navigate('/')
  }
  const createdTime = new Date(data.created_on)
  const formattedTime = `${createdTime.getHours()}:${
    createdTime.getMinutes() < 10 ? '0' : ''
  }${createdTime.getMinutes()}`

  const sellsFromDate = new Date(data.user.sells_from)
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]
  const formattedDate = `${
    monthNames[sellsFromDate.getMonth()]
  } ${sellsFromDate.getFullYear()}`

  return (
    <div>
      <S.Wrapper>
        <S.Container>
          <Header Authorization={Authorization} />
          <S.Main>
            <S.MainContainer>
              <MainMenu />
            </S.MainContainer>
            <S.MainArtic>
              <S.ArticContent>
                <S.ArticleLeft>
                  <S.ArticleFillImg
                    onClick={() => {
                      navigate('/')
                    }}
                  >
                    <S.ArticleImg>
                      <S.ArticleImgImg
                        src={`http://127.0.0.1:8090/${data?.images[selectedImageIndex]?.url}`}
                        alt=""
                      />
                    </S.ArticleImg>
                    <S.ArticleImgBar>
                      {imageUrls &&
                        imageUrls.map((imageUrl, index) => (
                          <S.ArticleImgBarDiv
                            key={index}
                            onClick={() => handleImageClick(index)}
                          >
                            <S.ArticleImgBarDivImg
                              src={imageUrl}
                              alt={`Image ${index + 1}`}
                            />
                          </S.ArticleImgBarDiv>
                        ))}
                    </S.ArticleImgBar>
                    <S.ArticleImgBarMob>
                      <S.ImgBarMobCircleActive />
                      <S.ImgBarMobCircle />
                      <S.ImgBarMobCircle />
                      <S.ImgBarMobCircle />
                      <S.ImgBarMobCircle />
                    </S.ArticleImgBarMob>
                  </S.ArticleFillImg>
                </S.ArticleLeft>

                <S.ArticleRight>
                  <S.ArticleBlock>
                    <S.ArticleTitle>{data.title}</S.ArticleTitle>
                    <S.ArticleInfo>
                      <S.ArticleDate>Сегодня в {formattedTime}</S.ArticleDate>
                      <S.ArticleCity>{data.user.city}</S.ArticleCity>
                      <S.ArticleLink
                        onClick={(e) => {
                          e.preventDefault()
                          setIsModalOpenReviews(true)
                        }}
                        href=""
                        target="_blank"
                        rel=""
                      >
                        Отзывы: {adComments ? adComments.length : '...'}
                      </S.ArticleLink>
                    </S.ArticleInfo>
                    <S.ArticlePrice>{data.price} ₽</S.ArticlePrice>
                    {showEdit ? (
                      <S.ArticleBtnBlock>
                        <S.ArticleBtnReact
                          onClick={(e) => {
                            e.preventDefault()
                            setIsModalOpen(true)
                          }}
                        >
                          Редактировать
                        </S.ArticleBtnReact>

                        <S.ArticleBtnRemove
                          onClick={DeleteAtdFunc}
                          disabled={deleted}
                        >
                          {deleted ? 'Удалено' : 'Снять с публикации'}
                        </S.ArticleBtnRemove>
                      </S.ArticleBtnBlock>
                    ) : (
                      <S.ArticleBtnReact onClick={handlePhoneClick}>
                        {data.user.phone === null ? (
                          <S.ArticleBtnSpan>
                            Телефон продавца не указан
                          </S.ArticleBtnSpan>
                        ) : (
                          <S.ArticleBtnSpan>
                            Показать телефон
                            <br />
                            {!phone
                              ? `${data?.user.phone.substring(
                                  0,
                                  1
                                )}${data?.user.phone.substring(1, 4)} XXX XX XX`
                              : data?.user.phone}
                          </S.ArticleBtnSpan>
                        )}
                      </S.ArticleBtnReact>
                    )}
                    <S.ArticleAuthor>
                      <S.AuthorImg>
                        <S.AuthorImgImg
                          src={`http://localhost:8090/${data.user.avatar}`}
                          alt=""
                        />
                      </S.AuthorImg>
                      <S.AuthorCont>
                        <Link to="/sellerProfile">
                          <S.AuthorName
                            onClick={() => {
                              navigate('/sellerProfile')
                            }}
                          >
                            {data.user.name}
                          </S.AuthorName>
                        </Link>
                        <S.AuthorAbout>
                          Продает товары с {formattedDate}
                        </S.AuthorAbout>
                      </S.AuthorCont>
                    </S.ArticleAuthor>
                  </S.ArticleBlock>
                </S.ArticleRight>
              </S.ArticContent>
            </S.MainArtic>

            <S.MainContainer>
              <S.MainTitle>Описание товара</S.MainTitle>
              <S.MainContent>
                <S.MainText>{data.description}</S.MainText>
              </S.MainContent>
            </S.MainContainer>
            {isModalOpenReviews && (
              <ReviewsModal
                onClose={() => setIsModalOpenReviews(false)}
                comments={advComments}
                advId={adId}
              />
            )}
          </S.Main>
          <Footer data={data} />
        </S.Container>
        {isModalOpen && (
          <EditModal data={data} onClose={() => setIsModalOpen(false)} />
        )}
      </S.Wrapper>
    </div>
  )
}

export default AdvPages
