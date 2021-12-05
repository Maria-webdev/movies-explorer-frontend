import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <section className='footer'>
           <div className='footer__section' >
      <div className='footer__block'>
        <h3 className='footer__block_title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      </div>

      <div className='footer__block_content'>
        <p className='footer__copyright'>&copy; 2021</p>

        <nav className='footer__links'>
          <li className='footer__links_item'>
            <a className='footer__links_link' href='https://practicum.yandex.ru/' target='_blank' rel='noopener noreferrer'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__links_item'>
            <a className='footer__links_link' href='https://github.com/Maria-webdev' target='_blank' rel='noopener noreferrer'>
              Github
            </a>
          </li>
          <li className='footer__links_item'>
            <a className='footer__links_link' href='https://www.facebook.com/profile.php?id=100006475123020' target='_blank' rel='noopener noreferrer'>
              Facebook
            </a>
          </li>
        </nav>
      </div>
      </div>
    </section>
  );
}

export default Footer; 