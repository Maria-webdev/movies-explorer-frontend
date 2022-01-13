import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <div className='techs__section'>
        <p className='project-title'>Технологии</p>
        <div className='techs-list'>
            <h2 className='techs-list__title'>7 технологий</h2>
            <p className='techs-list__item'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className='techs-nav-list'>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://developer.mozilla.org/ru/docs/Web/HTML'>HTML</a>
          </li>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://www.w3schools.com/css/'>CSS</a>
          </li>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://developer.mozilla.org/ru/docs/Web/JavaScript'>JS</a>
          </li>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://ru.react.js.org/'>React</a>
          </li>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://git-scm.com/'>Git</a>
          </li>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://expressjs.com/ru/'>Express.js</a>
          </li>
          <li className='techs-nav-list__item'>
            <a className='techs-nav-list__text' href='https://www.mongodb.com/'>mongoDB</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;