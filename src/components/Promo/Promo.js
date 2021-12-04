import React from 'react';
import PageLogo from '../../images/main-page-logo.png'
import './Promo.css';

function Promo() {
  return (
    <div className='promo'>
    <div className='promo_section'>
      <p className='promo__text'>Учебный проект студента факультета Веб-разработки.</p>
      <img className='promo__image' src={PageLogo} alt='логотип промо страницы' />
    </div>
    </div>
  );
};

export default Promo;