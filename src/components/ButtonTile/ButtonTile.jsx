/**
 * @component
 * @description Компонент інтерактивної плитки кольору, яка реагує на дії гравця та ігрові події.
 * * @param {Object} props - Властивості компонента
 * @param {string} props.color - Назва кольору (напр., 'green', 'red')
 * @param {boolean} props.isActive - Визначає, чи підсвічується плитка в даний момент
 * @param {boolean} props.isDisabled - Чи заблокована плитка для натискання
 * @param {Function} props.onClick - Функція-обробник кліку
 */

import "./ButtonTile.css";

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