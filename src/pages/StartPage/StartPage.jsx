import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Перехід на сторінку гри за допомогою роутера
    navigate('/game');
  };

  return (
    <div className="start-page">
      <Header title="Simon Says" />
      
      <main className="start-content">
        <section className="settings-section">
          <h3>Налаштування гри</h3>
          <SettingsForm />
        </section>

        <button className="start-btn" onClick={handleStart}>
          Почати гру
        </button>
      </main>
    </div>
  );
};

export default StartPage;