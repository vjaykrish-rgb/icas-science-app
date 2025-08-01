import { useState } from 'react';

const questions = [
  {
    question: "What is the main function of the roots in a plant?",
    choices: ["To make food", "To absorb water", "To support leaves", "To release oxygen"],
    answer: 1,
    explanation: "Roots absorb water and nutrients from the soil."
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    choices: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    answer: 2,
    explanation: "Plants absorb carbon dioxide for photosynthesis."
  }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = questions[current];

  const checkAnswer = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowFeedback(false);
    setCurrent((prev) => (prev + 1 < questions.length ? prev + 1 : 0));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>ICAS Science Practice</h2>
      <p>{q.question}</p>
      {q.choices.map((choice, i) => (
        <div key={i}>
          <button 
            onClick={() => checkAnswer(i)} 
            disabled={showFeedback}
            style={{ margin: '5px', padding: '10px', backgroundColor: selected === i ? '#ddd' : '#fff' }}
          >
            {choice}
          </button>
        </div>
      ))}
      {showFeedback && (
        <div style={{ marginTop: '10px' }}>
          <p>
            {selected === q.answer ? "✅ Correct!" : "❌ Incorrect."}
          </p>
          <p><strong>Explanation:</strong> {q.explanation}</p>
          <button onClick={nextQuestion} style={{ marginTop: '10px' }}>Next Question</button>
        </div>
      )}
    </div>
  );
}
