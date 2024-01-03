import {Footer} from '../../components/Footer/Footer'
import {Header} from '../../components/Header/Header'
import {MainMenu} from '../../components/MainMenu/MainMenu'
import * as S from './SellerProfilePagesStyle'
import {
  useGetAdsCurrentUserQuery,
  useGetUserInfoQuery,
} from '../../Service/AdsApi'
import { useState } from 'react'
import {CardsItemComponent} from '../../components/CardsItemComponent/CardsItemComponent'
import { Loader } from '../../helpers'
import { useParams, useNavigate } from 'react-router-dom'

export const SellerProfilePages = () => {
  
  const [phone, setPhone] = useState(false)
  const { id } = useParams()
  const { data, isLoading } = useGetAdsCurrentUserQuery(id)
  const { data: user, isLoading: isLoading2 } = useGetUserInfoQuery(id)
  const token = localStorage.getItem('access_token')
  const Authorization = !!token

  const handlePhoneClick = () => {
    setPhone(true)
  }

  const sellsFromDate = new Date(user?.sells_from)
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

  if (isLoading2) return <Loader />

  return (
    <S.Wrapper>
      <S.Container>
        <Header data={data} Authorization={Authorization} />
        <S.MainContainer>
          <S.MainCenterBlock>
            <MainMenu />
            <S.MainH2>Профиль продавца</S.MainH2>
            <S.MainProfileSell>
              <S.ProfileSellContent>
                <S.ProfileSell>
                  <S.SellerLeft>
                    <S.SellerImg>
                      <S.SellerImgImg
                        alt=""
                        src={`http://localhost:8090/${user?.avatar}`}
                      />
                    </S.SellerImg>
                  </S.SellerLeft>
                  <S.SellerRight>
                    <S.SellerTitle>{user?.name}</S.SellerTitle>
                    <S.SellerCity>{user?.city}</S.SellerCity>
                    <S.SellerCity>
                      Продает товары с {formattedDate}
                    </S.SellerCity>
                    <S.SellerImgMobBlock>
                      <S.SellerImgMob>
                        <S.SellerImgMobImg
                          alt=""
                          src={`http://localhost:8090/${user?.avatar}`}
                        />
                      </S.SellerImgMob>
                    </S.SellerImgMobBlock>
                    <S.SellerBtn onClick={handlePhoneClick}>
                      {user?.phone === null ? (
                        <S.SellerBtnSpan>
                          Телефон продавца не указан
                        </S.SellerBtnSpan>
                      ) : (
                        <S.SellerBtnSpan>
                          Показать телефон
                          <br />
                          {!phone
                            ? `${user?.phone.substring(
                                0,
                                1
                              )}${user?.phone.substring(1, 4)} XXX XX XX`
                            : user?.phone}
                        </S.SellerBtnSpan>
                      )}
                    </S.SellerBtn>
                  </S.SellerRight>
                </S.ProfileSell>
              </S.ProfileSellContent>
            </S.MainProfileSell>
            <S.MainTitle>Товары продавца</S.MainTitle>
            <S.ContentCards>
              {data?.map((ad, index) => (
                <CardsItemComponent
                  advId={ad.id}
                  key={index}
                  title={ad.title}
                  picture={
                    ad.images[0]
                      ? `http://localhost:8090/${ad.images[0].url}`
                      : (src = '/img/net-foto.png')
                  }
                  price={ad.price}
                  date={ad.created_on}
                  place={ad.user.city}
                  isLoading={isLoading}
                />
              ))}
            </S.ContentCards>
          </S.MainCenterBlock>
        </S.MainContainer>
        <Footer data={data} />
      </S.Container>
    </S.Wrapper>
  )
}

