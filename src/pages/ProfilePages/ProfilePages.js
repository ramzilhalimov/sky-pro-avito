import * as S from './ProfilePagesStyle'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import ProfileContent from '../../components/ProfileContent/ProfileContent'
import {
  useGetAdsCurrentUserQuery,
  useGetUserInfoQuery,
} from '../../Service/AdsApi'
import CardsItemComponent from '../../components/CardsItemComponent/CardsItemComponent'
import { Loader } from '../../helpers'

const ProfilePages = () => {
  const { data, isLoading } = useGetAdsCurrentUserQuery()
  const { data: user, isLoading: isLoading2 } = useGetUserInfoQuery()

  const profileKey = true
  if (isLoading2) return <Loader />
  return (
    <S.Wrapper>
      <S.Container>
        <Header data={data} profileKey={profileKey} />
        <S.MainContainer>
          <ProfileContent user={user} />
          <S.MainContent>
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
          </S.MainContent>
        </S.MainContainer>
        <Footer data={data} />
      </S.Container>
    </S.Wrapper>
  )
}

export default ProfilePages
