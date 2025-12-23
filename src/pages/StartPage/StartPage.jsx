import Header from "../components/Header/Header";
import "../StartPage.css";

const StartPage = () => {
  return (
    <div className="start-page">
      <Header title="Simon Says" />
      <button className="start-btn">Start Game</button>
    </div>
  );
};

export default StartPage;
