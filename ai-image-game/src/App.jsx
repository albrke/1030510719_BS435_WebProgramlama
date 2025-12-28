// src/App.jsx
import { useState } from 'react'
import './App.css'
import { questions } from './data/questions'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'

function App() {
  const [gameStatus, setGameStatus] = useState('start');
  const [gameMode, setGameMode] = useState('normal'); // 'normal' veya 'time'
  const [finalScore, setFinalScore] = useState(0);

  // Mod seçimine göre oyunu başlatan fonksiyon
  const startGame = (selectedMode) => {
    setGameMode(selectedMode); // Seçilen modu kaydet
    setGameStatus('playing');
  };

  const finishGame = (score) => {
    setFinalScore(score);
    setGameStatus('finished');
  };

  const restartGame = () => {
    setGameStatus('start');
    setFinalScore(0);
  };

  return (
    <div>
      {gameStatus === 'start' && <StartScreen onStart={startGame} />}

      {gameStatus === 'playing' && (
        <GameScreen 
          questions={questions} 
          onFinish={finishGame}
          mode={gameMode} // Mod bilgisini oyuna gönderiyoruz
        />
      )}

      {gameStatus === 'finished' && (
        <div style={{textAlign: 'center', marginTop: '50px', color: 'black'}}>
          <h1>Oyun Bitti!</h1>
          <h2>Mod: {gameMode === 'normal' ? 'Normal' : 'Zaman Karşı'}</h2>
          <h3>Puanın: {finalScore}</h3>
          <button 
            onClick={restartGame}
            style={{padding: '10px 20px', cursor: 'pointer', fontSize: '18px', marginTop: '20px'}}
          >
            Tekrar Oyna
          </button>
        </div>
      )}
    </div>
  )
}

export default App