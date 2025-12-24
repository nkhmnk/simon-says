import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header';
import ButtonTile from '../../components/ButtonTile/ButtonTile';
import Modal from '../../components/Modal/Modal';
import useSimonGame from '../../hooks/useSimonGame';
import { SettingsContext } from '../../context/SettingsContext';

import styles from './GamePage.module.css';
import modalStyles from '../../components/Modal/Modal.module.css';

const GamePage = () => {
  const { settings, addRecord } = useContext(SettingsContext);
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

  const handleExitToResults = () => {
    setIsModalOpen(false);
    // Створюємо унікальний ID сесії
    const sessionId = `${settings.playerName.replace(/\s/g, '_')}_${Date.now()}`;
    
    // Зберігаємо рекорд безпосередньо в момент завершення
    addRecord(settings.playerName, game.score, sessionId);
    
    // Переходимо на динамічний роут
    navigate(`/result/${sessionId}`, { state: { score: game.score } });
  };

  const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
  const visibleColors = ALL_COLORS.slice(0, settings.elementsCount);

  return (
    <div className={styles.gamePage}>
      <Header title={`Рівень ${game.level}`} />
      
      <div className={styles.playerInfo}>
        <span>Гравець: <strong>{settings.playerName}</strong></span>
        <span>Швидкість: <strong>{settings.speed}мс</strong></span>
      </div>

      <div className={styles.tileContainer}>
        {visibleColors.map((color) => (
          <div key={color} className={styles.tileItem}>
            <ButtonTile
              color={color}
              active={game.activeColor === color}
              onClick={() => game.handleTileClick(color)}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen}>
        <div className={styles.modalInner}>
          <h2>Гру завершено!</h2>
          <div className={styles.modalData}>
            <p>Результат: <span>{game.score}</span></p>
            <p>Рівень: <span>{game.level}</span></p>
          </div>
          <div className={modalStyles.modalActions}>
            <button className={modalStyles.btnRestart} onClick={() => { setIsModalOpen(false); game.startGame(); }}>
              Наступний тур
            </button>
            <button className={modalStyles.btnExit} onClick={handleExitToResults}>
              До результатів
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GamePage;