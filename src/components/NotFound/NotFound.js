import React from "react";
import "./NotFound.css";
// import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h3 className="not-found_type_404">404</h3>
      <p className="not-found__title">Страница не найдена</p>
            {/* <Link to='/' className='not-found__link'>
          Назад
          </Link> */}
    </div>
  );
}

export default NotFound;