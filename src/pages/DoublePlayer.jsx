import { useEffect, useState } from "react";
import Card from "../components/Card";
import Nav from "../components/Nav";

function DoublePlayer() {
  const [cards, setCards] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [difficulty, setDifficulty] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });

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
    setDisabled(false);
  }

  function handleNewGameClick() {
    resetTurn();
    setPlayerScores({ player1: 0, player2: 0 });
    resetCards();
  }

  function switchPlayer() {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
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

      setPlayerScores((prev) => ({
        ...prev,
        [`player${currentPlayer}`]: prev[`player${currentPlayer}`] + 1,
      }));

      resetTurn();
    } else {
      setTimeout(() => {
        resetTurn();
        switchPlayer();
      }, 1000);
    }
  }, [firstSelection, secondSelection]);

  useEffect(() => {
    resetCards();
  }, [difficulty]);

  const backgroundColor = currentPlayer === 1 ? "bg-red-500" : "bg-blue-500";

  return (
    <>
      <Nav />{" "}
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
      <div
        className={`w-screen h-screen flex justify-center items-center bg-custom-img-2`}
      >
        <div
          className={`w-screen h-screen flex justify-center items-center p-3 bg-opacity-25 ${backgroundColor}`}
        >
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
              <p
                className={`font-bold text-xl ${
                  currentPlayer === 1 ? "text-red-600" : "text-blue-600"
                }`}
              >
                Player {currentPlayer}'s turn
              </p>
              <table className="border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border-2 border-black px-4 py-2">Player</th>
                    <th className="border-2 border-black px-4 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black px-4 py-2">
                      Player 1
                    </td>
                    <td className="border-2 border-black px-4 py-2">
                      {playerScores.player1}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-4 py-2">
                      Player 2
                    </td>
                    <td className="border-2 border-black px-4 py-2">
                      {playerScores.player2}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoublePlayer;
