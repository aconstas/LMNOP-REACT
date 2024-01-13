import { useState } from "react";
import "./App.css";
import Howto from "./components/Howto/Howto.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Results from "./components/Results/Results.jsx";
import Game from "./components/Game/Game.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";

export default function App() {
  const [showResults, setshowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar />
      {isModalOpen && (
        <Howto closeModal={toggleModal} isModalOpen={isModalOpen} />
      )}
      {showResults && <Results />}
      <Game isModalOpen={isModalOpen} />
      <Keyboard isModalOpen={isModalOpen}/>
    </>
  );
}