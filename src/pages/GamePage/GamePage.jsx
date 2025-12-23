import React from "react";
import Header from "../components/Header/Header";
import ButtonTile from "../components/ButtonTile/ButtonTile";
import "./GamePage.css";

const GamePage = ({
  level,
  activeColor,
  isShowing,
  isUserTurn,
  isGameOver,
  handleTileClick,
  remainingTime,
  timeLimit,
  elementsCount 
}) => {
  const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];
  
  const visibleColors = ALL_COLORS.slice(0, elementsCount || 4);

  return (
    <div className="game-page">
      <Header title={`Рівень ${level}`} />
      
      <div className="status">
        {isShowing && <span>Спостерігайте послідовність...</span>}
        {!isShowing && isUserTurn && <span>Ваш хід</span>}
        {isGameOver && <span>Гра завершена</span>}
        
        {/* Рендер таймера, якщо передано час */}
        {remainingTime !== null && (
          <div style={{ marginTop: 12 }}>
            <strong>Залишилося: {remainingTime}s</strong>
            <div className="timer-bar" aria-hidden>
              {(() => {
                const limit = Number(timeLimit) || 30;
                const percent = Math.max(0, Math.min(100, Math.round((remainingTime / limit) * 100)));
                const isLow = remainingTime <= 5;
                const isHalf = remainingTime <= limit / 2;
                const className = `timer-fill ${isLow ? 'low' : ''} ${isHalf ? 'half' : ''}`.trim();
                return (
                  <div
                    className={className}
                    style={{ width: `${percent}%` }}
                  />
                );
              })()}
            </div>
          </div>
        )}
      </div>

      <div className="tile-container">
        {visibleColors.map((color) => (
          <ButtonTile
            key={color}
            color={color}
            active={activeColor === color}
            onClick={() => handleTileClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;