import * as S from './ProfilePagesStyle'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import ProfileContent from '../../components/ProfileContent/ProfileContent'
import { useGetAdsUserQuery, useGetUserInfoQuery } from '../../Service/AdsApi'
import CardsItemComponent from '../../components/CardsItemComponent/CardsItemComponent'

const ProfilePages = () => {
  const { data, isLoading } = useGetAdsUserQuery()
  const { data: user, isLoading: isLoading2 } = useGetUserInfoQuery()
  if (isLoading || isLoading2) return <div>hujh</div>
  const profileKey = true

  return (
    <S.Wrapper>
      <S.Container>
        <Header data={data} profileKey={profileKey} />
        <S.MainContainer>
          <ProfileContent user={user} />
          <S.MainContent>
            <S.ContentCards>
              {data.map((ad, index) => (
                <CardsItemComponent
                  advId={ad.id}
                  key={index}
                  title={ad.title}
                  picture={`http://localhost:8090/${ad.images[0]?.url}`}
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
