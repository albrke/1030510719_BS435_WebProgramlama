// src/components/StartScreen.jsx

const styles = {
    container: { 
      textAlign: 'center', 
      padding: '20px', 
      marginTop: '50px', 
      color: 'black' 
    },
    buttonGroup: { 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '20px', 
      marginTop: '20px' 
    },
    button: {
      padding: '15px 30px',
      fontSize: '16px',
      cursor: 'pointer',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      transition: 'transform 0.1s'
    },
    normalBtn: { backgroundColor: '#4CAF50' }, // Yeşil Buton
    timeBtn: { backgroundColor: '#FF5722' }    // Turuncu Buton
  };
  
  const StartScreen = ({ onStart }) => {
    return (
      <div style={styles.container}>
        <h1>🕵️‍♀️ AI Dedektifi</h1>
        <p>Modunu Seç ve Başla!</p>
        
        <div style={styles.buttonGroup}>
          {/* Normal Mod Butonu */}
          <button 
            style={{...styles.button, ...styles.normalBtn}}
            onClick={() => onStart('normal')}
          >
            ☕ Normal Mod
          </button>
  
          {/* Zaman Modu Butonu */}
          <button 
            style={{...styles.button, ...styles.timeBtn}}
            onClick={() => onStart('time')}
          >
            ⏳ Zaman Karşı
          </button>
        </div>
      </div>
    );
  };
  
  export default StartScreen;