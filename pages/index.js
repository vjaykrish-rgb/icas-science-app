import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = questions[current];

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/process-pdf", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setQuestions(data.questions);
    setCurrent(0);
    setUploading(false);
  };

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
    <div className="p-6 font-sans max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">ICAS Science Practice App</h1>

      <div className="mb-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={uploading}
        >
          {uploading ? "Processing..." : "Upload ICAS PDF"}
        </button>
      </div>

      {questions.length > 0 && q && (
        <div>
          <p>{q.question}</p>
          {q.choices.map((choice, i) => (
            <div key={i}>
              <button
                onClick={() => checkAnswer(i)}
                disabled={showFeedback}
                className="my-1 px-3 py-2 border rounded"
              >
                {choice}
              </button>
            </div>
          ))}

          {showFeedback && (
            <div className="mt-4">
              <p>
                {selected === q.answer ? "✅ Correct!" : "❌ Incorrect."}
              </p>
              <p><strong>Explanation:</strong> {q.explanation || "No explanation available."}</p>
              <button onClick={nextQuestion} className="mt-2 px-3 py-1 bg-green-600 text-white rounded">Next Question</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
