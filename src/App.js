import React, { useState, useEffect } from 'react';
import './App.css';

const generateTilePairs = () => {
  const pairs = [];
  for (let i = 1; i <= 18; i++) {
    pairs.push(i, i);
  }
  return pairs;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const App = () => {
  const [tiles, setTiles] = useState(generateTilePairs().map(number => ({ number, isFlipped: false })));
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    if (flippedTiles.length === 2) {
      const [firstTileIndex, secondTileIndex] = flippedTiles;
      const firstTile = tiles[firstTileIndex];
      const secondTile = tiles[secondTileIndex];

      if (firstTile.number === secondTile.number) {
        setMatchedPairs(matchedPairs + 1);
        setFlippedTiles([]);
      } else {
        setTimeout(() => {
          const newTiles = tiles.map((tile, index) => {
            if (index === firstTileIndex || index === secondTileIndex) {
              return { ...tile, isFlipped: false };
            }
            return tile;
          });
          setTiles(newTiles);
          setFlippedTiles([]);
        }, 1000);
      }
    }
  }, [flippedTiles, matchedPairs, tiles]);

  const handleClick = (index) => {
    if (!tiles[index].isFlipped && flippedTiles.length < 2) {
      const newTiles = [...tiles];
      newTiles[index].isFlipped = true;
      setTiles(newTiles);
      setFlippedTiles([...flippedTiles, index]);
    }
  };

  return (
    <div className="grid">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`tile ${tile.isFlipped ? 'flipped' : ''}`}
          onClick={() => handleClick(index)}
        >
          {tile.isFlipped ? tile.number : ''}
        </div>
      ))}
      {matchedPairs === 9 && <div className="win-message">Congratulations! You win!</div>}
    </div>
  );
};

export default App;
