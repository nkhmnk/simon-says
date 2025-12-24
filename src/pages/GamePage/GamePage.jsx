import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header';
import ButtonTile from '../../components/ButtonTile/ButtonTile';
import Modal from '../../components/Modal/Modal';
import useSimonGame from '../../hooks/useSimonGame';
import { SettingsContext } from '../../context/SettingsContext';
import './GamePage.css';

const GamePage = () => {
  const { settings } = useContext(SettingsContext);
  const game = useSimonGame(settings);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    game.startGame();
  }, []); 

  useEffect(() => {
    if (game.isGameOver) {
      setIsModalOpen(true);
    }
  }, [game.isGameOver]);

  const handleRestart = () => {
    setIsModalOpen(false);
    game.startGame();
  };

  const handleExitToResults = () => {
    setIsModalOpen(false);
    // Створюємо динамічний ID (наприклад: Player_17154321)
    const dynamicId = `${settings.playerName.replace(/\s/g, '_')}_${Date.now()}`;
    // Переходимо за динамічним маршрутом
    navigate(`/result/${dynamicId}`, { state: { score: game.score } });
  };

  const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
  const visibleColors = ALL_COLORS.slice(0, settings.elementsCount);

  return (
    <div className="game-page">
      <Header title={`Рівень ${game.level}`} />
      
      <div className="player-info">
        <span>Гравець: <strong>{settings.playerName}</strong></span>
        <span>Швидкість: <strong>{settings.speed}мс</strong></span>
      </div>

      <div className="status">
        {game.isShowing && <span className="fade-in">Запам'ятовуйте...</span>}
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

      <Modal isOpen={isModalOpen}>
        <div className="modal-inner">
          <h2>Гру завершено!</h2>
          <div className="modal-data">
            <p>Результат: <span>{game.score}</span></p>
            <p>Рівень: <span>{game.level}</span></p>
          </div>
          
          <div className="modal-actions">
            <button className="btn-restart" onClick={handleRestart}>Наступний тур</button>
            <button className="btn-exit" onClick={handleExitToResults}>До результатів</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GamePage;