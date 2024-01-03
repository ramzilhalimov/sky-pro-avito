import { Link } from 'react-router-dom'
import * as S from './CardsItemComponentStyle'
import { Loader } from '../../helpers'

export const CardsItemComponent = ({
  place,
  isLoading,
  picture,
  price,
  advId,
  title,
  date,
}) => {
  const createdTime = new Date(date)
  const formattedTime = `${createdTime.getHours()} : ${
    createdTime.getMinutes() < 10 ? '0' : ''
  }${createdTime.getMinutes()}`

  if (isLoading) return <Loader />

  return (
    <Link to={`/ad/${advId}`}>
      <S.CardsItem>
        <S.CardsCard>
          <S.CardsImage>
            <S.CardsImageImg src={picture} />
          </S.CardsImage>
          <S.CardContent>
            <S.CardTitle>{title}</S.CardTitle>
            <S.CardPrice>{price} ₽</S.CardPrice>
            <S.CardPlace>{place}</S.CardPlace>
            <S.CardDate>Сегодня в {formattedTime}</S.CardDate>
          </S.CardContent>
        </S.CardsCard>
      </S.CardsItem>
    </Link>
  )
}


