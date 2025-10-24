import "../styles/ButtonTile.css";

const ButtonTile = ({ color, active, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick && onClick();
      }}
      className={`button-tile ${color} ${active ? "active" : ""}`}
      aria-pressed={active}
    ></div>
  );
};

export default ButtonTile;
