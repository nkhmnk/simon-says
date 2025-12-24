import React from 'react';
import Header from '../../components/Header/Header';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import './StartPage.css';

const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <Header title="Simon Says" />
      
      <main className="start-content">
        <section className="settings-section">
          <h3>Налаштування гри</h3>
          <SettingsForm />
        </section>

        <button className="start-btn" onClick={onStart}>
          Почати гру
        </button>
      </main>
    </div>
  );
};

export default StartPage;