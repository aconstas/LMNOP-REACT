import { useEffect, useState } from "react";
import "./App.css";
import Howto from "./components/Howto/Howto.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Results from "./components/Results/Results.jsx";
import Game from "./components/Game/Game.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import wordlists from "./constants/wordlists.json";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [hints, setHints] = useState([]);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);

  const launchDate = new Date("2024-01-18");
  const currentDate = new Date();
  const daysSinceLaunch = Math.floor(
    (currentDate - launchDate) / (1000 * 60 * 60 * 24)
  );
  const currentGame = wordlists.filter(
    (game) => game.days_since_launch === daysSinceLaunch
  );
  const currentWordlist = currentGame[0].wordlist;
  const [userGuesses, setUserGuesses] = useState(
    Array(currentWordlist.length).fill("")
  );
  const [guessCount, setGuessCount] = useState(
    Array(currentWordlist.length).fill(0)
  );

  useEffect(() => {
    setHints(currentWordlist.map((set) => set.hint));
  }, [currentWordlist]);

  const addUserText = (key) => {
    setUserGuesses(
      userGuesses.map((guess, index) => {
        if (index === activeInputIndex) {
          return guess + key;
        }
        return guess;
      })
    );
  };

  const handleBackspace = () => {
    setUserGuesses(
      userGuesses.map((guess, index) => {
        if (index === activeInputIndex) {
          return guess.slice(0, -1);
        }
        return guess;
      })
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    startGame();
  };

  function startGame() {
    setGameStarted(!gameStarted);
  }

  function endGame() {
    setGameEnded(true);
    setIsModalOpen(true);
    console.log('the game has ended');
  }

  const checkGuess = (guess, correctWord) => {
    hasUserFailed(guess, correctWord);
    increaseGuessCount();
    //if the user guessed correct on the last word, end game
    if (guess === correctWord.toUpperCase() && activeInputIndex === 4 ) {
      endGame();
    }
    // if the user guessed the correct word and the user has more guesses left, move on
    if (guess === correctWord.toUpperCase() && guessCount[activeInputIndex] < 3) {
      console.log('moving to the next active index!')
      setActiveInputIndex((prevIndex) => prevIndex + 1);
      console.log("CORRECT! " + activeInputIndex);
    }
  };

  function hasUserFailed(guess, correctWord) {
    if(guess !== correctWord) setShakeIncorrect(true);
    // if the user did not guess the correct word on the final try of the last input, end game
    if (guess !== correctWord.toUpperCase() && guessCount[activeInputIndex] === 2 && activeInputIndex === 4) {
      console.log('you should shake here 1')
      endGame();
    }
    // if the user did not guess the correct word on the final (3rd) try, move on
    if (guess !== correctWord.toUpperCase() && guessCount[activeInputIndex] === 2) {
      console.log(`FAILED! ${activeInputIndex}`);
      console.log('you should shake here 2');
      if (activeInputIndex !== 4) setActiveInputIndex((prevIndex) => prevIndex + 1);
    }
  }

  function increaseGuessCount() {
    console.log('increasing guess count!')
    setGuessCount(guessCount.map((item, index) => 
    index === activeInputIndex ? item + 1 : item
    ))
  }

console.log(guessCount, userGuesses, activeInputIndex);
  return (
    <>
      <Navbar />
      {isModalOpen && (
        <Howto closeModal={toggleModal} isModalOpen={isModalOpen} />
      )}
      {gameEnded && <Results guessCount={guessCount} currentWordList={currentWordlist}/>}
      <Game
        isModalOpen={isModalOpen}
        gameStarted={gameStarted}
        userGuess={userGuesses}
        currentWordlist={currentWordlist}
        activeInputIndex={activeInputIndex}
        checkGuess={checkGuess}
        hints={hints}
        shakeIncorrect={shakeIncorrect}
      />
      <Keyboard
        isModalOpen={isModalOpen}
        addUserText={addUserText}
        handleBackspace={handleBackspace}
        checkGuess={checkGuess}
        activeGuess={userGuesses[activeInputIndex]}
        correctWord={currentWordlist[activeInputIndex]?.word}
      />
    </>
  );
}

// use guessCount to construct <Results />