/**
 * @module components/ButtonTile
 */
import "./ButtonTile.css"; // Імпорт має бути НАД основним описом компонента

/**
 * Компонент ігрової плитки (кнопки), яка реагує на натискання та підсвічується.
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {string} props.color - Колір плитки (наприклад, 'red', 'blue').
 * @param {boolean} props.active - Стан підсвічування плитки.
 * @param {Function} props.onClick - Обробник події натискання.
 * @returns {JSX.Element} Рендерить інтерактивну плитку.
 */
const ButtonTile = ({ color, active, onClick }) => {
  return (
    <div 
      className={`button-tile ${color} ${active ? 'active' : ''}`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
    ></div>
  );
};

export default ButtonTile;