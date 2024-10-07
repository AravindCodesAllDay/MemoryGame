import { useNavigate } from "react-router-dom";

export default function Nav() {
  const nav = useNavigate();
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-200 rounded-full p-3 w-72 mt-4 flex justify-around font-bold shadow-lg">
      <button onClick={() => nav("/single")} className="text-green-600">
        SinglePlayer
      </button>
      /
      <button onClick={() => nav("/double")} className="text-red-600">
        MultiPLayer
      </button>
    </div>
  );
}
