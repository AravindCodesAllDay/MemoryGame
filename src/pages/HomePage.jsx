import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-custom-img bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col items-center translate-y-44 gap-1 md:gap-3 bg-opacity-30 bg-white p-3 rounded-xl">
        <h1 className="text-3xl md:text-5xl font-bold">Memory game</h1>
        <p className="font-semibold">by Nothing</p>
        <button
          onClick={() => nav("/single")}
          className="border-2 border-opacity-15 rounded-lg p-1 hover:bg-opacity-15 text-white hover:bg-white hover:text-opacity-45 transition-all duration-150 ease-in-out"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
