import { useDispatch, useSelector } from 'react-redux'
import CardsItemComponent from '../../components/CardsItemComponent/CardsItemComponent'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import { useGetAdsQuery, useGetUserInfoQuery } from '../../Service/AdsApi'
import * as S from './MainPagesStyle'
import { setAds } from '../../store/slices/userSlice'
import { useEffect, useState } from 'react'

const MainPages = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const ads = useSelector((state) => state.user.ads)
  const { data, isLoading } = useGetAdsQuery()
  const token = localStorage.getItem('access_token')
  const Authorization = !!token
  const { data: userInfo, isLoading: loadUser } = useGetUserInfoQuery()

  const handleSearchClick = (event) => {
    event.preventDefault()
    setSearchResults(
      ads.filter(({ title }) =>
        title.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }

  useEffect(() => {
    if (searchValue !== '') {
      const filteredAds = ads.filter(({ title }) =>
        title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setSearchResults(filteredAds)
    } else {
      setSearchResults(ads)
    }
  }, [searchValue, ads])

  useEffect(() => {
    if (!isLoading) {
      dispatch(setAds(data))
    }
  }, [data, isLoading])

  if (userInfo) {
    localStorage.setItem('id_user', userInfo.id)
  }

  if (isLoading || loadUser) return <div>идет загрузка</div>
  return (
    <S.Wrapper>
      <S.Container>
        <Header data={data} Authorization={Authorization} />
        <S.Main>
          <Search
            setSearchValue={setSearchValue}
            onSearch={handleSearchClick}
          />
          <S.MainContainer>
            <S.MainH2>Объявления</S.MainH2>
            <S.MainContent>
              {searchValue !== '' && searchResults?.length === 0 ? (
                <h2>Ничего не найдено</h2>
              ) : null}
              <S.ContentCards>
                {searchResults === ''
                  ? data.map((ad, index) => (
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
                    ))
                  : searchResults.map((ad, index) => (
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
        </S.Main>
        <Footer data={data} />
      </S.Container>
    </S.Wrapper>
  )
}

export default MainPages
