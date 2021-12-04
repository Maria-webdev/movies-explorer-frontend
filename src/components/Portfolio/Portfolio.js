import React from 'react';
import './Portfolio.css';
import Arrow from '../../images/arrow.png';

function Portfolio() {
  return (
    <section className='portfolio'>
          <div className='portfolio__section'>
      <nav className='portfolio-list'>
        <h3 className='portfolio-list__heading'>Портфолио</h3>
        <li className='portfolio-list__item'>
          <a
            className='portfolio-list__link'
            href='https://github.com/Maria-webdev/Maria-webdev.github.io'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='portfolio-list__item-text'>Статичный сайт</p>
            <img
              className='portfolio-list__item-pic'
              src={Arrow}
              alt='изображение стрелки'
            />
          </a>
        </li>
        <li className='portfolio-list__item'>
          <a
            className='portfolio-list__link'
            href='https://maria-webdev.github.io/russian-travel/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='portfolio-list__item-text'>Адаптивный сайт</p>
            <img
              className='portfolio-list__item-pic'
              src={Arrow}
              alt='изображение стрелки'
            />
          </a>
        </li>
        <li className='portfolio-list__item'>
          <a
            className='portfolio-list__link'
            href='https://github.com/Maria-webdev/Maria-webdev.github.io'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='portfolio-list__item-text'>
              Одностраничное приложение
            </p>
            <img
              className='portfolio-list__item-pic'
              src={Arrow}
              alt='изображение стрелки'
            />
          </a>
        </li>
      </nav>
      </div>
    </section>
  );
};

export default Portfolio;