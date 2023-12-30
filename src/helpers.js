import React from 'react'

import './helpers.css'

export const Loader = () => {
  return (
    <div className="content">
      <div className="spinner">
        <div className="spinner-circle spinner-circle-outer"></div>
        <div className="spinner-circle-off spinner-circle-inner"></div>
        <div className="spinner-circle spinner-circle-single-1"></div>
        <div className="spinner-circle spinner-circle-single-2"></div>
        <div className="text">...loading...</div>
      </div>
    </div>
  )
}

export const forceLogout = () => {
  localStorage.clear()
  window.location.navigate('/')
}
