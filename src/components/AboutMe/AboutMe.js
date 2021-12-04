import React from 'react';
import './AboutMe.css';
import MyPhoto from '../../images/MyPhoto.png';

function AboutMe() {
  return (
    <section className='student' id='student'>
      <article className='page__content'>
        <p className='student section__title section_size_l'>Студент</p>
        <div className='student__profile'>
          <div className='student__info'>
            <h2 className='student__heading student__heading_size_l'>Мария</h2>
            <h3 className='student__heading student__heading_size_m'>Фронтенд-разработчик</h3>
            <p className='student__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt iaculis egestas. Praesent varius placerat justo et finibus. Nullam mi odio,
            sollicitudin non pretium a, tempus in orci. Nullam imperdiet ligula lorem, in volutpat urna varius id. Quisque risus elit, semper et elit ac, porttitor bibendum nisl.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sed turpis molestie, pulvinar ex et, rhoncus lacus. 
            </p>
            <nav className='column-social'>
              <li className='column-social__item'>
                <a className='column-social__item-link' href='https://www.facebook.com/profile.php?id=100006475123020' target='_blank' rel='noopener noreferrer'>Facebook</a></li>
              <li className='column-social__item'><a className='column-social__item-link' href='https://github.com/Maria-webdev' target='_blank' rel='noopener noreferrer'>GitHub</a></li>
            </nav>
          </div>
          <div className='student__image-card'>
            <img className='student__image' src={MyPhoto} alt='мое фото' />
          </div>
        </div>
      </article>
    </section>
  );
}

export default AboutMe;