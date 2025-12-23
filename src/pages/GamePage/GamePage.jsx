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

  // 2. ВИПРАВЛЕННЯ ПОМИЛКИ "0 БАЛІВ":
  // Слідкуємо за зміною стану isGameOver. 
  // Коли гра закінчується, ми беремо актуальний score з хука.
  useEffect(() => {
    if (game.isGameOver) {
      // Викликаємо функцію з App.jsx і передаємо фінальний результат
      onGameOver(game.score);
    }
  }, [game.isGameOver, game.score, onGameOver]);

  // Список всіх можливих кольорів
  const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
  
  // Обрізаємо масив відповідно до налаштувань складності (elementsCount)
  const visibleColors = ALL_COLORS.slice(0, settings.elementsCount || 4);

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