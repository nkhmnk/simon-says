import Header from "../components/Header";
import ButtonTile from "../components/ButtonTile";
import "../styles/GamePage.css";

const GamePage = () => {
  return (
    <div className="game-page">
      <Header title="Game On!" />
      <div className="tile-container">
        <ButtonTile color="red" />
        <ButtonTile color="green" />
        <ButtonTile color="blue" />
        <ButtonTile color="yellow" />
      </div>
    </div>
  );
};

export default GamePage;
