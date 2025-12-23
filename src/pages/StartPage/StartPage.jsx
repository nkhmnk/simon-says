import React from 'react'; 
import Header from '../../components/Header/Header';
import './StartPage.css';

const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <Header title="Simon Says" />
      
      <button className="start-btn" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;