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
  const [gameNumber, setGameNumber] = useState(0);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);

  const launchDate = new Date("2024-01-17T00:00:00"); // This is in UTC

  const pstOffset = 8 * 60; // PST is UTC-8
  const currentOffset = launchDate.getTimezoneOffset();

  // Adjust the launch date to PST
  launchDate.setMinutes(launchDate.getMinutes() - pstOffset + currentOffset);

  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - pstOffset + currentDate.getTimezoneOffset()
  );

  const daysSinceLaunch = Math.floor(
    (currentDate - launchDate) / (1000 * 60 * 60 * 24)
  );

  // get today's game from .json file
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
    setGameNumber(currentGame[0].days_since_launch);
  }, []);

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
    setTimeout(() => {
      setGameEnded(true);
      setIsModalOpen(true);
    }, 2400)
  }

  const checkGuess = (guess, correctWord) => {
    const isCorrectGuess = guess === correctWord.toUpperCase();
    const isLastAttempt = guessCount[activeInputIndex] === 2;
    const isLastWord = activeInputIndex === 4;

    updateGuessCount();
    setShakeIncorrect(!isCorrectGuess);

    if (isCorrectGuess) {
      handleCorrectGuess(isLastWord);
    } else if (isLastAttempt) {
      handleLastAttempt(isLastWord);
    }
  };

  function updateGuessCount() {
    console.log("updating guess count");
    // prevent increase of guessCount after failing
    if (guessCount[activeInputIndex] < 3) {
      setGuessCount(
        guessCount.map((item, index) =>
          index === activeInputIndex ? item + 1 : item
        )
      );
    }
  }

  function handleCorrectGuess(isLastWord) {
    if (isLastWord) {
      endGame();
    } else {
      moveToNextWord();
    }
  }

  function handleLastAttempt(isLastWord) {
    markWordAsFailed();
    if (!isLastWord) {
      moveToNextWord();
    } else {
      endGame();
    }
  }

  function moveToNextWord() {
    console.log("moving to next word");
    setTimeout(() => {
      setActiveInputIndex((prevIndex) => prevIndex + 1);
    }, 400);
  }

  function markWordAsFailed() {
    console.log("marking word as failed");
    setGuessCount(
      guessCount.map((item, index) =>
        index === activeInputIndex ? "FAIL" : item
      )
    );
  }

  console.log(guessCount, userGuesses, activeInputIndex);
  return (
    <>
      <Navbar />
      {isModalOpen && (
        <Howto closeModal={toggleModal} isModalOpen={isModalOpen} />
      )}
      {gameEnded && (
        <Results
          guessCount={guessCount}
          currentWordList={currentWordlist}
          gameNumber={gameNumber}
        />
      )}
      <Game
        isModalOpen={isModalOpen}
        gameStarted={gameStarted}
        userGuess={userGuesses}
        currentWordlist={currentWordlist}
        activeInputIndex={activeInputIndex}
        checkGuess={checkGuess}
        hints={hints}
        shakeIncorrect={shakeIncorrect}
        setShakeIncorrect={setShakeIncorrect}
        guessCount={guessCount}
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
