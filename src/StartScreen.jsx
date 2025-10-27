import React from "react";

function StartScreen({ onStart }) {
    return (
        <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">AI Image Guess Game</h1>
            <p className="text-lg text-gray-300">
                3 görselden hangisinin yapay zeka tarafından üretildiğini bulmaya çalış!
            </p>
            <button
                onClick={onStart}
                className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all"
            >
                Başla
            </button>
        </div>
    );
}

export default StartScreen;