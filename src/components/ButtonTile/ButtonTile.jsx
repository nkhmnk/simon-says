import React from 'react';
import styles from './ButtonTile.module.css';

const ButtonTile = ({ color, active, onClick }) => {
  return (
    <button
      className={`${styles.buttonTile} ${styles[color]} ${active ? styles.active : ''}`}
      onClick={onClick}
    />
  );
};

export default ButtonTile;