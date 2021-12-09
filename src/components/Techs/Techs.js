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
            <p className='techs-nav-list__text'>HTML</p>
          </li>
          <li className='techs-nav-list__item'>
            <p className='techs-nav-list__text'>CSS</p>
          </li>
          <li className='techs-nav-list__item'>
            <p className='techs-nav-list__text'>JS</p>
          </li>
          <li className='techs-nav-list__item'>
            <p className='techs-nav-list__text'>React</p>
          </li>
          <li className='techs-nav-list__item'>
            <p className='techs-nav-list__text'>Git</p>
          </li>
          <li className='techs-nav-list__item'>
            <p className='techs-nav-list__text'>Express.js</p>
          </li>
          <li className='techs-nav-list__item'>
            <p className='techs-nav-list__text'>mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;