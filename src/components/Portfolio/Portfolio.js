import React from 'react';
import './Portfolio.css';
import Arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__section'>
        <nav className='portfolio-list'>
          <h3 className='portfolio-list__heading'>Портфолио</h3>
          <li className='portfolio-list__item'>
            <a className='portfolio-list__link' href='https://github.com/Maria-webdev/how-to-learn' target='_blank' rel='noopener noreferrer'>
              <p className='portfolio-list__item_text'>Статичный сайт</p>
              <img className='portfolio-list__item_pic' src={Arrow} alt='изображение стрелки' />
            </a>
          </li>
          <li className='portfolio-list__item'>
            <a className='portfolio-list__link' href='https://maria-webdev.github.io/russian-travel/' target='_blank' rel='noopener noreferrer'>
              <p className='portfolio-list__item_text'>Адаптивный сайт</p>
              <img className='portfolio-list__item_pic' src={Arrow} alt='изображение стрелки' />
            </a>
          </li>
          <li className='portfolio-list__item'>
            <a className='portfolio-list__link' href='https://viannat-frontend-mesto.nomoredomains.club/' target='_blank' rel='noopener noreferrer'>
              <p className='portfolio-list__item_text'>Одностраничное приложение</p>
              <img className='portfolio-list__item_pic' src={Arrow} alt='изображение стрелки' />
            </a>
          </li>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
