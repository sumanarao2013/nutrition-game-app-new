"use client";

import React, { useState } from 'react';
import { Star, RotateCcw } from 'lucide-react';

const NutritionGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<number>>(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);

  const levels = [
    {
      question: "Find the total Calories in this snack!",
      label: {
        servingSize: "1 cup (228g)",
        calories: 250,
        fat: "8g",
        protein: "12g"
      },
      options: [150, 250, 350],
      correct: 250,
      hint: "Look for the big number at the top of the label!"
    },
    {
      question: "How many servings are in this container?",
      label: {
        servingSize: "1 cup (228g)",
        servingsPerContainer: 2,
        calories: 250,
        fat: "8g"
      },
      options: [1, 2, 3],
      correct: 2,
      hint: "Check the 'Servings Per Container' line!"
    },
    {
      question: "Is this food high in protein?",
      label: {
        servingSize: "1 cup (228g)",
        calories: 250,
        protein: "20g",
        dailyValueProtein: "40%"
      },
      options: ["Yes!", "No"],
      correct: "Yes!",
      hint: "If it has more than 20% of your daily value, it's high!"
    },
    {
      question: "If you eat the whole container, how many calories will you consume?",
      label: {
        servingSize: "1 cup (228g)",
        servingsPerContainer: 2,
        calories: 250,
        sugar: "14g",
        totalFat: "8g"
      },
      options: [250, 400, 500],
      correct: 500,
      hint: "Remember to multiply calories by number of servings!"
    },
    {
      question: "This snack is low in sugar. True or False?",
      label: {
        servingSize: "1 cup (228g)",
        calories: 250,
        sugar: "14g",
        dailyValueSugar: "28%"
      },
      options: ["True", "False"],
      correct: "False",
      hint: "If daily value is more than 20%, it's considered high!"
    }
  ];

  const handleRestart = () => {
    setCurrentLevel(0);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setAnsweredCorrectly(new Set());
    setGameCompleted(false);
  };

  const handleAnswer = (answer: any) => {
    const isAnswerCorrect = answer === levels[currentLevel].correct;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    if (isAnswerCorrect && !answeredCorrectly.has(currentLevel)) {
      setScore(score + 1);
      setAnsweredCorrectly(prev => new Set(prev).add(currentLevel));
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentLevel < levels.length - 1 && isAnswerCorrect) {
        setCurrentLevel(currentLevel + 1);
      } else if (currentLevel === levels.length - 1 && isAnswerCorrect) {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const currentQuestion = levels[currentLevel];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Nutrition Label Master</h1>
        <p className="text-center opacity-90">Learn to read nutrition labels like a pro!</p>
      </div>

      {/* Score and Level Tracking */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400 w-8 h-8" />
          <span className="text-2xl font-bold text-gray-800">Score: {score}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg text-gray-600 font-medium">
            Level {currentLevel + 1} of {levels.length}
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        {/* Nutrition Label */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300 mb-6 shadow-inner">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Nutrition Facts</h3>
          <div className="border-b-2 border-black pb-4">
            <div className="text-lg">Serving Size {currentQuestion.label.servingSize}</div>
            {currentQuestion.label.servingsPerContainer && (
              <div className="text-lg">Servings Per Container {currentQuestion.label.servingsPerContainer}</div>
            )}
          </div>
          <div className="text-4xl font-bold my-4 text-gray-900">
            Calories {currentQuestion.label.calories}
          </div>
          <div className="border-t-2 border-black pt-4">
            {Object.entries(currentQuestion.label)
              .filter(([key]) => !['servingSize', 'calories', 'servingsPerContainer'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="flex justify-between text-lg mb-2">
                  <span className="capitalize font-medium">{key}</span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Question Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">{currentQuestion.question}</h2>
          <p className="text-lg text-gray-600 bg-blue-50 p-3 rounded-lg inline-block">
            💡 Hint: {currentQuestion.hint}
          </p>
        </div>

        {/* Answer Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`p-4 text-xl rounded-xl text-white font-medium transition-all transform hover:scale-102 hover:shadow-lg ${
                showFeedback && option === currentQuestion.correct
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Message */}
      {showFeedback && (
        <div className={`text-center p-6 rounded-xl ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        } animate-fadeIn`}>
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            {isCorrect ? (
              <>🎉 Great job! That's correct!</>
            ) : (
              <>💪 Try again! You can do it!</>
            )}
          </div>
        </div>
      )}

      {/* Game Completion Card */}
      {gameCompleted && score === levels.length && (
        <div className="text-center mt-6 p-8 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold text-yellow-800 mb-4">🎉 Congratulations! 🎉</h3>
          <p className="text-xl text-yellow-700 mb-2">You're a Nutrition Label Expert!</p>
          <p className="text-lg text-yellow-600 mb-6">You got all {levels.length} questions correct!</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-8 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors flex items-center gap-2 mx-auto font-bold text-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default NutritionGame;