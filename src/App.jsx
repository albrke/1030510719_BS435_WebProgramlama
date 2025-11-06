import React, { useState } from "react";
import StartScreen from "./StartScreen";

function App() {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            {!isStarted ? (
                <StartScreen onStart={() => setIsStarted(true)} />
            ) : (
                <h1 className="text-3xl">Oyun Başlayacak!</h1>
            )}
        </div>
    );
}

export default App;