import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Header title="404" />
      <p>Сторінку не знайдено</p>
      <button className={styles.homeBtn} onClick={() => navigate('/')}>
        На головну
      </button>
    </div>
  );
};

export default NotFound;