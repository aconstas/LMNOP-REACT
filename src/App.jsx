import { useState } from "react";
import "./App.css";
import Howto from "./components/Howto/Howto.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Results from "./components/Results/Results.jsx";
import Game from "./components/Game/Game.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [userGuess, setUserGuess] = useState("");

  function addUserText(key) {
    const newText = userGuess + key;
    setUserGuess(newText);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    startGame();
  };

  function startGame() {
    setGameStarted(!gameStarted);
  }

  return (
    <>
      <Navbar />
      {isModalOpen && (
        <Howto closeModal={toggleModal} isModalOpen={isModalOpen} />
      )}
      {gameEnded && <Results />}
      <Game isModalOpen={isModalOpen} gameStarted={gameStarted} userGuess={userGuess}/>
      <Keyboard isModalOpen={isModalOpen} addUserText={addUserText}/>
    </>
  );
}
