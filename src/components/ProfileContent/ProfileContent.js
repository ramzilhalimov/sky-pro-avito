import { useEffect, useState } from 'react'
import {
  useChangeAvatarMutation,
  useUserUpdateMutation,
} from '../../Service/AdsApi'
import MainMenu from '../MainMenu/MainMenu'
import * as S from './ProfileContentStyle'

const ProfileContent = ({ user }) => {
  const [UpdateUser] = useUserUpdateMutation()
  const [userData, setUserData] = useState({
    name: user?.name,
    surname: user?.surname,
    city: user?.city,
    phone: user?.phone,
  })
  const [changeAvatar] = useChangeAvatarMutation()
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar)

  useEffect(() => {
    avatarUrl === null
      ? setAvatarUrl('../img/profileImg.jpg')
      : setAvatarUrl(`http://localhost:8090/${user?.avatar}`)
  }, [userData])

  const handleInputChange = (e) => {
    setUserData({
      ...userData.data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedData = await UpdateUser(userData).unwrap()
    } catch (error) {
      console.error('Ошибка при обновлении пользователя', error)
    }
  }

  const handleImageChange = async (event) => {
    let file = event.target.files?.[0]
    if (file) {
      setAvatarUrl(file)
      const reader = new FileReader()
      reader.onload = function () {
        fetch(reader.result)
          .then((res) => res.blob())
          .then((blob) => {
            const formData = new FormData()
            formData.append('file', blob, 'img.gpg')
            changeAvatar(formData)
          })
        setAvatarUrl(user.data?.avatar)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <S.MainCenterBlock>
      <MainMenu />
      <S.MainH2>Здравствуйте, {userData?.name}!</S.MainH2>
      <S.MainProlile>
        <S.ProfileContent>
          <S.ProfileTitle>Настройки профиля</S.ProfileTitle>
          <S.ProfileSettings>
            <S.SettingsLeft action="#">
              <S.SettingsImg>
                <S.SettingImgImg alt="" src={avatarUrl} />
              </S.SettingsImg>
              <S.SettingsChangePhoto>
                Заменить
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageChange(e)}
                />
              </S.SettingsChangePhoto>
            </S.SettingsLeft>
            <S.SettingsRight>
              <S.SettingForm action="#" onSubmit={handleSubmit}>
                <S.SettingsDiv>
                  <S.Label htmlFor="fname">Имя</S.Label>
                  <S.SettingInputAll
                    id="settings-fname"
                    name="name"
                    type="text"
                    value={userData?.name}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                </S.SettingsDiv>
                <S.SettingsDiv>
                  <S.Label htmlFor="lname">Фамилия</S.Label>
                  <S.SettingInputAll
                    id="settings-lname"
                    name="surname"
                    type="text"
                    value={userData?.surname}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                </S.SettingsDiv>
                <S.SettingsDiv>
                  <S.Label htmlFor="city">Город</S.Label>
                  <S.SettingInputAll
                    id="settings-city"
                    name="city"
                    type="text"
                    value={userData?.city}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                </S.SettingsDiv>
                <S.SettingsDiv>
                  <S.Label htmlFor="phone">Телефон</S.Label>
                  <S.SettingInputPhone
                    id="settings-phone"
                    name="phone"
                    type="tel"
                    value={userData?.phone}
                    onChange={handleInputChange}
                    placeholder="+79161234567"
                  />
                </S.SettingsDiv>
                <S.SettingBtn
                  id="settings-btn"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Сохранить
                </S.SettingBtn>
              </S.SettingForm>
            </S.SettingsRight>
          </S.ProfileSettings>
        </S.ProfileContent>
      </S.MainProlile>
      <S.MainTitle>Мои товары</S.MainTitle>
    </S.MainCenterBlock>
  )
}

export default ProfileContent
