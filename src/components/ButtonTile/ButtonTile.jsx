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