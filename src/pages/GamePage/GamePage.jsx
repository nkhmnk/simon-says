import React, { useEffect, useContext, useState } from "react";
import Header from '../../components/Header/Header';
import ButtonTile from '../../components/ButtonTile/ButtonTile';
import Modal from '../../components/Modal/Modal'; // Новий імпорт
import useSimonGame from '../../hooks/useSimonGame';
import { SettingsContext } from '../../context/SettingsContext';

import './GamePage.css';

const GamePage = ({ onGameOver }) => {
  const { settings } = useContext(SettingsContext);
  const game = useSimonGame(settings);
  
  // Локальний стан для керування модальним вікном (Етап 3)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    game.startGame();
  }, []); 

  // Замість автоматичного onGameOver, відкриваємо модалку
  useEffect(() => {
    if (game.isGameOver) {
      setIsModalOpen(true);
    }
  }, [game.isGameOver]);

  const handleRestart = () => {
    setIsModalOpen(false);
    game.startGame(); // Починаємо заново на цій же сторінці
  };

  const handleExitToResults = () => {
    setIsModalOpen(false);
    onGameOver(game.score); // Перехід до загальних результатів
  };

  const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
  const visibleColors = ALL_COLORS.slice(0, settings.elementsCount);

  return (
    <div className="game-page">
      <Header title={`Рівень ${game.level}`} />
      
      <div className="status">
        {game.isShowing && <span className="fade-in">Спостерігайте за послідовністю...</span>}
        {!game.isShowing && game.isUserTurn && <span className="pulse">Ваш хід!</span>}
      </div>

      <div className="tile-container">
        {visibleColors.map((color) => (
          <ButtonTile
            key={color}
            color={color}
            active={game.activeColor === color}
            onClick={() => game.handleTileClick(color)}
          />
        ))}
      </div>

      {/* ПОРТАЛ: Діалогове вікно завершення гри (Лаба 3) */}
      <Modal isOpen={isModalOpen}>
        <div className="modal-inner">
          <h2>Гра завершена!</h2>
          <p className="modal-score">Ваш результат: <span>{game.score}</span></p>
          <p>Гравець: <strong>{settings.playerName}</strong></p>
          
          <div className="modal-actions">
            <button className="btn-restart" onClick={handleRestart}>
              Наступний тур
            </button>
            <button className="btn-exit" onClick={handleExitToResults}>
              До результатів
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GamePage;