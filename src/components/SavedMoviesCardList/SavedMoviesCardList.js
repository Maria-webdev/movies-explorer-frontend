import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import '../MoviesCardsList/MoviesCardsList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './SavedMoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import '../More/More.css';
import MoviesCarsList from '../MoviesCardsList/MoviesCardsList';

function SavedMoviesCardList(props) {
  return (
    <section className='movies-cardlist'>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <section className='movies-cardlist__section'>
          <MoviesCarsList {...props} isSaved />
        </section>
      )}
    </section>
  );
}

export default SavedMoviesCardList;