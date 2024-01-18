import { useState } from "react";
import "./App.css";
import Howto from "./components/Howto/Howto.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Results from "./components/Results/Results.jsx";
import Game from "./components/Game/Game.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import wordlists from './constants/wordlists.json';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [userGuess, setUserGuess] = useState("");

  const launchDate = new Date('2024-01-18');
  const currentDate = new Date();
  const daysSinceLaunch = Math.floor((currentDate - launchDate) / (1000 * 60 * 60 * 24));
  const currentGame = wordlists.filter(game => game.days_since_launch === daysSinceLaunch);
  const currentWordlist = currentGame[0].wordlist;

  function addUserText(key) {
    const newText = userGuess + key;
    setUserGuess(newText);
  }

  function handleBackspace() {
    setUserGuess(prevGuess => prevGuess.slice(0, -1));
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
      <Game isModalOpen={isModalOpen} gameStarted={gameStarted} userGuess={userGuess} currentWordlist={currentWordlist}/>
      <Keyboard isModalOpen={isModalOpen} addUserText={addUserText} handleBackspace={handleBackspace}/>
    </>
  );
}
