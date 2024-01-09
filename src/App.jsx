import { useState } from 'react';
import './App.css'
import Howto from './components/HowTo/Howto';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [showResults, setshowResults] = useState(false);

  return (
    <>
      <Navbar />
      < Howto />
    </>
  )
}

export default App
