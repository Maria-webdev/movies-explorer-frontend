import { useState, useCallback } from 'react';
import './More.css';
import { debounce } from 'lodash';

function More(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handler = useCallback(
    // eslint-disable-next-line func-names
    debounce(function () {
      setWindowSize(window.innerWidth);
    }, 500),
    []
  );

  function moviesCount() {
    if (windowSize >= 901) return { count: 12, more: 4 };
    if (windowSize >= 638) return { count: 8, more: 2 };
    if (windowSize >= 320) return { count: 5, more: 1 };
  }

  const onMoreButtonClick = () => {
    setFilteredMovies(
      props.cards.slice(0, (filteredMovies.length += moviesCount().more))
    );
  };

  return (
    <div className='more'>
      <button className='more__button' onClick={onMoreButtonClick} type='button'>Ещё</button>

    </div>
  );
};

export default More;