import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Howto from "./components/Howto/Howto.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Results from "./components/Results/Results.jsx";
import Game from "./components/Game/Game.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import wordlists from "./constants/wordlists.json";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { StopwatchProvider } from "./contexts/stopwatchContext.jsx";
import Instructions from "./components/Instructions/Instructions.jsx";
import Settings from "./components/Settings/Settings.jsx";

export default function App() {
  const [lastPlayed, setLastPlayed] = useLocalStorage("lastPlayed", null);
  const [gamesPlayed, setGamesPlayed] = useLocalStorage("gamesPlayed", []);
  const [streak, setStreak] = useLocalStorage("streak", 1);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [hints, setHints] = useState([]);
  const [gameNumber, setGameNumber] = useState(0);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);

  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const launchDate = dayjs("2024-01-17");
  let now = dayjs();
  const currentDate = now.format("YYYY-MM-DD");
  const daysSinceLaunch = now.diff(launchDate, "days");

  // Calculate which puzzle to show based on total days since launch
  const totalWordlists = wordlists.length;
  const currentWordlistIndex = daysSinceLaunch % totalWordlists;
  
  // Get today's game from the calculated index
  const currentGame = wordlists[currentWordlistIndex];
  const currentWordlist = currentGame.wordlist;
  
  const navigate = useNavigate();
  if (currentWordlist.length === 0) {
    navigate("/uh-oh");
  }
  
  const [userGuesses, setUserGuesses] = useState("");
  const [guessCount, setGuessCount] = useState(
    Array(currentWordlist.length).fill(0)
  );

  useEffect(() => {
    setHints(currentWordlist.map((set) => set.hint));
    // Use the actual days since launch for the game number to maintain unique identifiers
    setGameNumber(daysSinceLaunch);

    if (lastPlayed === currentDate) {
      setShowResults(true);
    }
  }, [currentDate, lastPlayed, currentWordlist, daysSinceLaunch]);

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

  const updateSteak = (lastPlayed) => {
    if (lastPlayed === dayjs().subtract(1, "day").format("YYYY-MM-DD")) {
      const updatedStreak = streak + 1;
      setStreak(updatedStreak);
    } else {
      setStreak(1);
    }
  };

  const endGame = useCallback(() => {
    setActiveInputIndex(null);
    setGameStarted(false);
    setTimeout(() => {
      addGameNumber(gameNumber);
      updateSteak(lastPlayed);
      setShowResults(true);
      setLastPlayed(currentDate);
      setIsModalOpen(true);
      // updateLocalStorage(currentDate, gameNumber);
    }, 1250);
  }, [currentDate, gameNumber, lastPlayed, addGameNumber, setLastPlayed]);

  const updateGuessCount = useCallback(() => {
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
      if (guess === "") return;
      const isCorrectGuess = guess === correctWord.toUpperCase();
      const isLastAttempt = guessCount[activeInputIndex] === 2;
      const isLastWord = activeInputIndex === 4;

      updateGuessCount();
      setShakeIncorrect(!isCorrectGuess);
      if (!isCorrectGuess) setUserGuesses("");
      if (isCorrectGuess) {
        handleCorrectGuess(isLastWord);
      } else if (isLastAttempt) {
        handleLastAttempt(isLastWord);
      }
    },
    [userGuesses, guessCount, activeInputIndex, updateGuessCount]
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

  
  useEffect(() => {
    console.log(`


    888      888b     d888 888b    888  .d88888b.  8888888b.  
    888      8888b   d8888 8888b   888 d88P" "Y88b 888   Y88b 
    888      88888b.d88888 88888b  888 888     888 888    888 
    888      888Y88888P888 888Y88b 888 888     888 888   d88P 
    888      888 Y888P 888 888 Y88b888 888     888 8888888P"  
    888      888  Y8P  888 888  Y88888 888     888 888        
    888      888   "   888 888   Y8888 Y88b. .d88P 888        
    88888888 888       888 888    Y888  "Y88888P"  888        
                                                              
    `)
  }, [])

  return (
    <>
      <Navbar 
        showInstructions={showInstructions} 
        setShowInstructions={setShowInstructions} 
        showSettings={showSettings} 
        setShowSettings={setShowSettings}
      />
      {showInstructions && <Instructions showInstructions={showInstructions} setShowInstructions={setShowInstructions}/>}
      {showSettings && <Settings showSettings={showSettings} setShowSettings={setShowSettings}/>}
      <StopwatchProvider>
        {(lastPlayed !== currentDate && isModalOpen) && (
          <Howto closeModal={toggleModal} isModalOpen={isModalOpen} />
        )}
        {/* display <Results/> if end of game (showResults === true) OR user already played */}
        {(showResults || lastPlayed === currentDate) && <Results
          guessCount={guessCount}
          currentWordList={currentWordlist}
          gameNumber={gameNumber}
          showResults={showResults}
          setShowResults={setShowResults}
          currentDate={currentDate}
          lastPlayed={lastPlayed}
          setLastPlayed={setLastPlayed}
          gamesPlayed={gamesPlayed}
          setIsModalOpen={setIsModalOpen}
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
          lastPlayed={lastPlayed}
          currentDate={currentDate}
        />
      </StopwatchProvider>
      {lastPlayed !== currentDate && <Keyboard
        addUserText={addUserText}
        handleBackspace={handleBackspace}
        checkGuess={checkGuess}
        activeGuess={userGuesses}
        correctWord={currentWordlist[activeInputIndex]?.word}
      />}
    </>
  );
}