// src/components/GameScreen.jsx
import { useState, useEffect } from 'react'; // useEffect'i import etmeyi unutma!

const GameScreen = ({ questions, onFinish, mode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [eliminatedIds, setEliminatedIds] = useState([]);
  const [score, setScore] = useState(0);
  
  // Zaman Modu için Sayaç (Her soru 15 saniye)
  const [timer, setTimer] = useState(15);

  if (!questions || questions.length === 0) return <div>Yükleniyor...</div>;
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return <div>Yükleniyor...</div>;

  // --- ZAMANLAYICI MANTIĞI ---
  useEffect(() => {
    // Eğer mod 'time' değilse veya cevap verildiyse sayacı durdur
    if (mode !== 'time' || feedback !== "") return;

    // Süre bittiyse
    if (timer === 0) {
      setFeedback("Süre Doldu! ⌛ Sıradaki soruya geçiliyor...");
      setTimeout(() => {
        nextQuestion();
      }, 2000);
      return;
    }

    // Her 1 saniyede bir timer'ı azalt
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Temizlik (Component unmount olunca interval'ı sil)
    return () => clearInterval(interval);
  }, [timer, mode, feedback]); // timer, mode veya feedback değişince tetiklenir


  const handleImageClick = (image) => {
    if (feedback !== "" || eliminatedIds.includes(image.id)) return;

    if (image.isAi) {
      setFeedback("Doğru! 🎉");
      // Zaman modunda hızlı bilen daha çok puan alsın (+ kalan saniye)
      const timeBonus = mode === 'time' ? timer : 0;
      setScore(score + (attempt === 1 ? 20 : 10) + timeBonus);
      
      setTimeout(() => nextQuestion(), 1500);
    } else {
      if (attempt === 1) {
        setAttempt(2);
        setFeedback(`Yanlış! İpucu: ${currentQuestion.hint}`);
        setEliminatedIds([...eliminatedIds, image.id]);
      } else {
        setFeedback("Maalesef bilemedin.");
        setTimeout(() => nextQuestion(), 2000);
      }
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setAttempt(1);
      setFeedback("");
      setEliminatedIds([]);
      setTimer(15); // Sayacı sıfırla
    } else {
      onFinish(score);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>Soru: {currentIndex + 1} / {questions.length}</span>
        
        {/* Sadece Zaman Modunda Sayacı Göster */}
        {mode === 'time' && (
          <span style={{color: timer < 5 ? 'red' : 'black', fontWeight: 'bold'}}>
            ⏳ Süre: {timer}
          </span>
        )}
        
        <span>Puan: {score}</span>
      </div>

      <h2>{currentQuestion.description}</h2>
      {feedback && <div style={styles.feedback}>{feedback}</div>}

      <div style={styles.grid}>
        {currentQuestion.images.map((img) => {
          const isEliminated = eliminatedIds.includes(img.id);
          return (
            <div 
              key={img.id} 
              onClick={() => handleImageClick(img)}
              style={{
                ...styles.card,
                opacity: isEliminated ? 0.3 : 1,
                cursor: isEliminated ? 'default' : 'pointer',
                border: isEliminated ? '2px solid red' : '2px solid transparent'
              }}
            >
              <img src={img.src} alt="tahmin" style={styles.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Stiller aynı kalabilir, yukarıdakiyle aynı
const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center', color: 'black' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' },
  feedback: { backgroundColor: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '5px', marginBottom: '20px' },
  grid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  card: { width: '200px', height: '200px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  image: { width: '100%', height: '100%', objectFit: 'cover' }
};

export default GameScreen;