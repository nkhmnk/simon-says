import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ResultPage.css";

const ResultPage = ({ score, onRestart, onMain }) => {
  return (
    <div className="result-page">
      <Header title="Гра завершена" />

      <main className="result-content">
        <div className="score-container">
          <h2>Ваш результат</h2>
          <div className="final-score">{score}</div>
          <p>Рівнів пройдено успішно</p>
        </div>

        <div className="result-actions">
          <button className="btn-primary" onClick={onRestart}>
            Спробувати знову
          </button>
          <button className="btn-secondary" onClick={onMain}>
            Головне меню
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;