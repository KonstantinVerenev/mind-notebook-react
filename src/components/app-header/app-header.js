import React from 'react';

import './app-header.css'

const AppHeader = ({ allPosts, likedPosts }) => {
  return (
    <div className="app-header d-flex">
      <h1>Konstantin Verenev</h1>
      <h2>{allPosts} записей, из них понравилось {likedPosts}</h2>
    </div>
  )

}

export default AppHeader;
