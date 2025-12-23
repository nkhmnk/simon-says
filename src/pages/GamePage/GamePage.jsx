import React, { useEffect, useContext } from "react";
import Header from '../../components/Header/Header';
import ButtonTile from '../../components/ButtonTile/ButtonTile';
import useSimonGame from '../../hooks/useSimonGame';
import { SettingsContext } from '../../context/SettingsContext';
import './GamePage.css';

const GamePage = ({ onGameOver }) => {
  const { settings } = useContext(SettingsContext);
  
  const game = useSimonGame(settings);

  useEffect(() => {
    game.startGame();
  }, []); 

  useEffect(() => {
    if (game.isGameOver) {
      onGameOver(game.score);
    }
  }, [game.isGameOver, game.score, onGameOver]);

  const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
  
  const visibleColors = ALL_COLORS.slice(0, settings.elementsCount);

  return (
    <div className="game-page">
      {/* Header відображає поточний рівень */}
      <Header title={`Рівень ${game.level}`} />
      
      <div className="status">
        {game.isShowing && <span className="fade-in">Спостерігайте за послідовністю...</span>}
        {!game.isShowing && game.isUserTurn && <span className="pulse">Ваш хід!</span>}
        {game.isGameOver && <span>Гра завершена</span>}
      </div>

      <div className="tile-container">
        {visibleColors.map((color) => (
          <ButtonTile
            key={color}
            color={color}
            // active стає true, коли хук підсвічує цей колір
            active={game.activeColor === color}
            // Передаємо функцію кліку в чистий компонент плитки
            onClick={() => game.handleTileClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;