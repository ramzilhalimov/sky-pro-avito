import styled from 'styled-components'

const maxMobileWidthTwo = '620px'

export const Footer = styled.footer`
  display: none;

  @media screen and (max-width: ${maxMobileWidthTwo}) {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    // justify-content: footer__imgcenter;
    height: 54px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
    justify-content: center;
  }
`
export const FooterContainer = styled.div`
  @media screen and (max-width: ${maxMobileWidthTwo}) {
    width: 225px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
export const FooterImg = styled.div`
@media screen and (max-width: ${maxMobileWidthTwo}) {
width: 42px;
height: 42px;
}
`
export const FooterImgImg = styled.img`
@media screen and (max-width: ${maxMobileWidthTwo}) {
width: 100%;
height: 100%;
display: block;
-o-object-fit: cover;
   object-fit: cover;
}
`