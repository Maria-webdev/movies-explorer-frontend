import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import '../MoviesCardsList/MoviesCardsList.css';
import MoviesCard from  '../MoviesCard/MoviesCard.js';
import './SavedMoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import '../More/More.css';

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  function moviesCount() {
    if (windowSize >= 901) return { count: 12, more: 3 };
    if (windowSize >= 638) return { count: 8, more: 2 };
    if (windowSize >= 320) return { count: 5, more: 1 };
  }

  const handler = useCallback(
    // eslint-disable-next-line func-names
    debounce(function () {
      setWindowSize(window.innerWidth);
    }, 500),
    []
  );

  useEffect(() => {
    const newMovies = props.cards.slice(0, moviesCount().count);
    setFilteredMovies(newMovies);
  }, [props.cards, windowSize]);

  useEffect(() => {
    window.addEventListener('resize', () => handler());
  }, []);

  const onMoreButtonClick = () => {
    setFilteredMovies(
      props.cards.slice(0, (filteredMovies.length += moviesCount().more))
    );
  };

return (
  <section className='movies-cardlist'>
    {props.isLoading ? (
        <Preloader />
      ) : (
      <section className='movies-cardlist__section'>
        <ul className='cards__list'>
        {props.cards.reduce((filmsBatch, item) => {
              if (filmsBatch.length < filteredMovies.length) {
                filmsBatch.push(<MoviesCard card={item} key={item.id} onChangeState={props.onMovieSave} savedMovies={props.savedMovies} />);
              }
              return filmsBatch;
            }, [])}
        </ul>
        <div className='more'>
      <button className='more__button' onClick={onMoreButtonClick} type='button'>Ещё</button>
    </div>
        </section>
      )}
    </section>

);
};

export default SavedMovies;