import cover from "../assets/panda.svg";
import "./Card.css";

const Card = ({ card, handleCardClick, disabled }) => {
  return (
    <button
      className={`card h-[80px] w-[60px] border-2 rounded-lg bg-blue-200 ${
        card.matchFound ? "matched" : ""
      }`}
      disabled={disabled}
      onClick={handleCardClick}
      data-id={card.id}
    >
      <div className="front side">
        <img src={cover} alt="cover image" width="45" />
      </div>
      <div className="side back">{card.emoji}</div>
    </button>
  );
};
export default Card;
