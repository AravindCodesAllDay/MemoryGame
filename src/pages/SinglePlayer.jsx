import { useEffect, useState } from "react";
import Card from "../components/Card";
import Nav from "../components/Nav";

function SinglePlayer() {
  const [cards, setCards] = useState(null);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [difficulty, setDifficulty] = useState(true);
  const [minMoves, setMinMoves] = useState({ easy: 0, hard: 0 });

  const easyItems = [
    { emoji: "👇", id: "1", matchFound: false, flipped: false },
    { emoji: "👀", id: "2", matchFound: false, flipped: false },
    { emoji: "🤌", id: "3", matchFound: false, flipped: false },
    { emoji: "👋", id: "4", matchFound: false, flipped: false },
    { emoji: "🤘", id: "5", matchFound: false, flipped: false },
    { emoji: "😶", id: "6", matchFound: false, flipped: false },
    { emoji: "🤦‍♂️", id: "7", matchFound: false, flipped: false },
    { emoji: "🍌", id: "8", matchFound: false, flipped: false },
  ];

  const hardItems = [
    ...easyItems,
    { emoji: "🎉", id: "9", matchFound: false, flipped: false },
    { emoji: "🎩", id: "10", matchFound: false, flipped: false },
    { emoji: "🐶", id: "11", matchFound: false, flipped: false },
    { emoji: "🐱", id: "12", matchFound: false, flipped: false },
    { emoji: "🌵", id: "13", matchFound: false, flipped: false },
    { emoji: "🌈", id: "14", matchFound: false, flipped: false },
    { emoji: "🔥", id: "15", matchFound: false, flipped: false },
    { emoji: "🚀", id: "16", matchFound: false, flipped: false },
    { emoji: "🐷", id: "17", matchFound: false, flipped: false },
    { emoji: "🎉", id: "18", matchFound: false, flipped: false },
  ];

  useEffect(() => {
    const storedMinMoves = JSON.parse(localStorage.getItem("minMoves"));
    if (storedMinMoves) {
      setMinMoves(storedMinMoves);
    }
  }, []);

  function resetCards() {
    const items = difficulty === true ? easyItems : hardItems;
    const shuffled = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, key: Math.random() }));
    setCards(shuffled);
  }

  function handleCardClick(e) {
    const clickedCardId = e.target.dataset.id;

    if (firstSelection === clickedCardId) return;

    firstSelection
      ? setSecondSelection(clickedCardId)
      : setFirstSelection(clickedCardId);
  }

  function resetTurn() {
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves((m) => m + 1);
    setDisabled(false);
  }

  function handleNewGameClick() {
    if (cards.every((card) => card.matchFound)) {
      if (
        difficulty === true &&
        (minMoves.easy === 0 || moves < minMoves.easy)
      ) {
        const newMinMoves = { ...minMoves, easy: moves };
        setMinMoves(newMinMoves);
        localStorage.setItem("minMoves", JSON.stringify(newMinMoves));
      } else if (
        difficulty === "hard" &&
        (minMoves.hard === 0 || moves < minMoves.hard)
      ) {
        const newMinMoves = { ...minMoves, hard: moves };
        setMinMoves(newMinMoves);
        localStorage.setItem("minMoves", JSON.stringify(newMinMoves));
      }
    }
    resetTurn();
    setMoves(0);
    resetCards();
  }

  useEffect(() => {
    if (!secondSelection) {
      return;
    }
    setDisabled(true);
    if (firstSelection === secondSelection) {
      setCards((prev) => {
        return prev.map((card) => {
          if (card.id === firstSelection) {
            return { ...card, matchFound: true };
          } else {
            return card;
          }
        });
      });
      resetTurn();
    } else {
      setTimeout(() => {
        resetTurn();
      }, 1000);
    }
  }, [firstSelection, secondSelection]);

  useEffect(() => {
    resetCards();
  }, [difficulty]);

  return (
    <>
      <Nav />
      <button
        onClick={() => setDifficulty(!difficulty)}
        className={`px-4 py-2 rounded-md text-white font-semibold flex items-center gap-2 absolute bottom-0 m-3 ${
          difficulty === true ? "bg-green-600" : "bg-red-600"
        }`}
      >
        Mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-360 size-5"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 15.328c2.414 -.718 4 -1.94 4 -3.328c0 -2.21 -4.03 -4 -9 -4s-9 1.79 -9 4s4.03 4 9 4" />
          <path d="M9 13l3 3l-3 3" />
        </svg>
      </button>
      <button
        onClick={() => handleNewGameClick()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md absolute bottom-0 right-0 m-3 flex items-center gap-2"
      >
        New Game
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus size-5"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </button>
      <div className="w-screen h-screen bg-custom-img-1 bg-no-repeat bg-cover bg-center flex justify-center items-center p-3">
        <div className="flex flex-col md:flex-row gap-12">
          <div
            className={`gameboard grid ${
              difficulty === true ? "grid-cols-4" : "grid-cols-6"
            } gap-4 bg-gray-50 bg-opacity-85 p-8 rounded-2xl border-4 border-blue-200 shadow-lg`}
          >
            {cards &&
              Object.values(cards).map((card) => (
                <Card
                  key={card.key}
                  card={card}
                  disabled={disabled}
                  handleCardClick={handleCardClick}
                />
              ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-semibold text-xl"> Moves: {moves}</p>
            <p>
              Best Moves({difficulty === true ? "Easy" : "Hard"}):{" "}
              {difficulty === true ? minMoves.easy : minMoves.hard}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePlayer;
