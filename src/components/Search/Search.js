import * as S from './SearchStyle'

const Search = ({ setSearchValue, onSearch }) => {
  return (
    <S.MainSearch>
      <S.SearchLogoLink href="#" target="_blank">
        <S.SearchLogoImg src="img/logo.png" alt="logo" />
      </S.SearchLogoLink>
      <S.SearchLogoMobLink href="#" target="_blank">
        <S.SearchLogoMobImg src="img/logo-mob.png" alt="logo" />
      </S.SearchLogoMobLink>
      <S.SearchForm action="#">
        <S.SearchText
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <S.SearchTextMob
          type="search"
          placeholder="Поиск"
          name="search-mob"
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <S.SearchBtn onClick={onSearch}>Найти</S.SearchBtn>
      </S.SearchForm>
    </S.MainSearch>
  )
}

export default Search
