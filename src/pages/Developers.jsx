import developer from "../assets/developer.png";

export default function Developers() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-custom-img-3 bg-no-repeat bg-cover bg-center">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Developers</h1>
        <img
          src={developer}
          alt="developer"
          className="w-48 h-48 object-cover mb-4 rounded-full border-4 border-gray-300"
        />
        <p className="text-lg text-gray-700">
          <span className="block">Aravindhan UD</span>
          <span className="block">Sree Aranganathan D</span>
          <span className="block">Ragul Vasanth SM</span>
          <span className="block">Sakth Vignesh N</span>
        </p>
      </div>
    </div>
  );
}
