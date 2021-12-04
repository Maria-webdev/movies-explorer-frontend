import React from 'react';
import './Portfolio.css';
import Arrow from '../../images/arrow.png';

function Portfolio() {
  return (
    <section className='portfolio'>
          <article className='page__content'>
      <nav className='portfolio-list'>
        <h3 className='portfolio-list__heading'>Портфолио</h3>
        <li className='portfolio-list__item'>
          <a
            className='portfolio-list__link'
            href='https://myr-irina.github.io/how-to-learn/'
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
            href='https://myr-irina.github.io/project-work-3/'
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
            href='https://mesto.mesto.students.nomoredomains.monster'
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
      </article>
    </section>
  );
};

export default Portfolio;