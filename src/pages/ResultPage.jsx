import Header from "../components/Header";
import "../styles/ResultPage.css";

const ResultPage = () => {
  return (
    <div className="result-page">
      <Header title="Results" />
      <p>Your score: 0</p>
      <button>Play Again</button>
    </div>
  );
};

export default ResultPage;
