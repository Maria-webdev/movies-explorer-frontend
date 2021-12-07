import React from 'react';
import './MoviesCardsList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import cards from '../../utils/cards';

function MoviesCardsList(props) {
  const cards = props.cards || [];
  const [cardsArray, setCardsArray] = React.useState(0);

  const renderCards = React.useCallback(() => {
    setCardsArray(cards);
  }, []);

  React.useEffect(() => renderCards(), [renderCards]);

  return (
    <section className='movies-cardlist'>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <section className='movies-cardlist__section'>
          <ul className='cards__list'>
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
          </ul>
          </section>
      )}
      </section>
  
  );
};

export default MoviesCardsList;