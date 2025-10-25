import Header from "../components/Header";
import "../styles/ResultPage.css";

const ResultPage = ({ score, onRestart }) => {
  return (
    <div className="result-page">
      <Header title="Results" />
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default ResultPage;
