import Header from "../components/Header";
import ButtonTile from "../components/ButtonTile";
import "../styles/GamePage.css";

const GamePage = ({
  level,
  activeColor,
  isShowing,
  isUserTurn,
  isGameOver,
  handleTileClick,
}) => {
  return (
    <div className="game-page">
      <Header title={`Level ${level}`} />
      <div className="status">
        {isShowing && <span>Watch the sequence...</span>}
        {!isShowing && isUserTurn && <span>Your turn</span>}
        {isGameOver && <span>Game over</span>}
      </div>
      <div className="tile-container">
        <ButtonTile
          color="red"
          active={activeColor === "red"}
          onClick={() => handleTileClick("red")}
        />
        <ButtonTile
          color="green"
          active={activeColor === "green"}
          onClick={() => handleTileClick("green")}
        />
        <ButtonTile
          color="blue"
          active={activeColor === "blue"}
          onClick={() => handleTileClick("blue")}
        />
        <ButtonTile
          color="yellow"
          active={activeColor === "yellow"}
          onClick={() => handleTileClick("yellow")}
        />
      </div>
    </div>
  );
};

export default GamePage;
