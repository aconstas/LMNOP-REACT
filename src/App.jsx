import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Howto from "./components/Howto/Howto.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Results from "./components/Results/Results.jsx";
import Game from "./components/Game/Game.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import wordlists from "./constants/wordlists.json";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { StopwatchProvider } from "./contexts/stopwatchContext.jsx";

export default function App() {
  console.log("app.jsx re-rendered");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // const [time, setTime] = useState(0);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [hints, setHints] = useState([]);
  const [gameNumber, setGameNumber] = useState(0);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);

  const [lastPlayed, setLastPlayed] = useLocalStorage("lastPlayed", null);
  const [gamesPlayed, setGamesPlayed] = useLocalStorage("gamesPlayed", []);

  const launchDate = dayjs("2024-01-17");

  let now = dayjs();
  const currentDate = now.format("YYYY-MM-DD");
  const daysSinceLaunch = now.diff(launchDate, "days");

  // get today's game from .json file
  const currentGame = wordlists.filter(
    (game) => game.days_since_launch === daysSinceLaunch
  );
  const currentWordlist = currentGame[0].wordlist;
  const [userGuesses, setUserGuesses] = useState("");
  const [guessCount, setGuessCount] = useState(
    Array(currentWordlist.length).fill(0)
  );

  useEffect(() => {
    setHints(currentWordlist.map((set) => set.hint));
    setGameNumber(currentGame[0].days_since_launch);
  }, []);

  const addUserText = useCallback((key) => {
    setUserGuesses((prevGuess) => prevGuess + key);
  }, []);

  const handleBackspace = useCallback(() => {
    setUserGuesses((prevGuess) => prevGuess.slice(0, -1));
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    startGame();
  };

  function startGame() {
    setGameStarted(!gameStarted);
  }

  const addGameNumber = useCallback(
    (gameNumber) => {
      const updatedGamesPlayed = [...gamesPlayed, gameNumber];
      setGamesPlayed(updatedGamesPlayed);
    },
    [gamesPlayed, setGamesPlayed]
  );

  const updateLocalStorage = useCallback(
    (currentDate, gameNumber) => {
      setLastPlayed(currentDate);
      addGameNumber(gameNumber);
    },
    [addGameNumber, setLastPlayed]
  );

  const endGame = useCallback(() => {
    setActiveInputIndex(null);
    setGameStarted(false);
    setTimeout(() => {
      setShowResults(true);
      // setIsModalOpen(true);
      updateLocalStorage(currentDate, gameNumber);
    }, 1250);
  }, [currentDate, gameNumber, updateLocalStorage]);

  const updateGuessCount = useCallback(() => {
    // prevent increase of guessCount after failing
    if (guessCount[activeInputIndex] < 3) {
      setGuessCount(
        guessCount.map((item, index) =>
          index === activeInputIndex ? item + 1 : item
        )
      );
    }
  }, [activeInputIndex, guessCount]);

  const checkGuess = useCallback(
    (guess, correctWord) => {
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
    },
    [
      userGuesses,
      guessCount,
      handleLastAttempt,
      activeInputIndex,
      updateGuessCount,
    ]
  );

  const handleCorrectGuess = useCallback(
    (isLastWord) => {
      if (isLastWord) {
        endGame();
      } else {
        moveToNextWord();
      }
    },
    [endGame]
  );

  function handleLastAttempt(isLastWord) {
    markWordAsFailed();
    if (!isLastWord) {
      moveToNextWord();
    } else {
      endGame();
    }
  }

  function moveToNextWord() {
    setTimeout(() => {
      setUserGuesses("");
      setActiveInputIndex((prevIndex) => prevIndex + 1);
    }, 400);
  }

  function markWordAsFailed() {
    setGuessCount(
      guessCount.map((item, index) =>
        index === activeInputIndex ? "FAIL" : item
      )
    );
  }

  return (
    <>
      <Navbar />
      <StopwatchProvider>
        {isModalOpen && (
          <Howto closeModal={toggleModal} isModalOpen={isModalOpen} />
        )}
        {showResults && <Results
          guessCount={guessCount}
          currentWordList={currentWordlist}
          gameNumber={gameNumber}
          setShowResults={setShowResults}
        />}
      <Game
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
      </StopwatchProvider>
      <Keyboard
        addUserText={addUserText}
        handleBackspace={handleBackspace}
        checkGuess={checkGuess}
        activeGuess={userGuesses}
        correctWord={currentWordlist[activeInputIndex]?.word}
      />
    </>
  );
}
