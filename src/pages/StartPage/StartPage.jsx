import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import styles from './StartPage.module.css'; // Імпорт модулів

const StartPage = () => {
  const navigate = useNavigate(); // Хук для навігації

  return (
    <div className={styles.startPage}>
      <Header title="Simon Says" />
      
      <main className={styles.startContent}>
        <section className={styles.settingsSection}>
          <h3>Налаштування гри</h3>
          <SettingsForm />
        </section>

        <button 
          className={styles.startBtn} 
          onClick={() => navigate('/game')}
        >
          Почати гру
        </button>
      </main>
    </div>
  );
};

export default StartPage;