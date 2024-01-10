import { useState } from 'react';
import './App.css'
import Howto from './components/HowTo/Howto';
import Navbar from './components/Navbar/Navbar';
import Results from './components/Results/Results';
import Game from './components/Game/Game';

function App() {
  const [showResults, setshowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <Navbar />
      {isModalOpen && < Howto closeModal={toggleModal} isModalOpen={isModalOpen}/>}
      <Game isModalOpen={isModalOpen}/>
      {showResults && <Results />}
    </>
  )
}

export default App
