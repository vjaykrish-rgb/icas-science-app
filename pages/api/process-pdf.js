// React (Next.js) Frontend - pages/index.js
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("home");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [message, setMessage] = useState("");

  const q = questions[current];

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please choose a PDF file first.");
      return;
    }
    setUploading(true);
    setMessage("Uploading and processing...");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setQuestions(data.questions);
        setCurrent(0);
        setMessage(`✅ Loaded ${data.questions.length} question(s).`);
        setMode("quiz");
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to parse PDF"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    }

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

  const goBack = () => setMode("home");

  return (
    <div className="p-6 font-sans max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">ICAS Science Practice App</h1>

      {mode === "home" && (
        <div className="space-y-4">
          <button
            onClick={() => setMode("upload")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload ICAS PDF
          </button>
          <button
            onClick={() => setMode("quiz")}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={questions.length === 0}
          >
            Take Test
          </button>
        </div>
      )}

      {mode === "upload" && (
        <div>
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
            {uploading ? "Processing..." : "Upload and Extract Questions"}
          </button>
          {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
          <div className="mt-4">
            <button onClick={goBack} className="px-3 py-1 bg-gray-300 rounded">Go to Home</button>
          </div>
        </div>
      )}

      {mode === "quiz" && questions.length > 0 && q && (
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

          <div className="mt-4 space-x-2">
            <button onClick={() => setMode("upload")} className="px-3 py-1 bg-gray-300 rounded">Back</button>
            <button onClick={goBack} className="px-3 py-1 bg-gray-300 rounded">Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}
// React (Next.js) Frontend - pages/index.js
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("home");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [message, setMessage] = useState("");

  const q = questions[current];

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please choose a PDF file first.");
      return;
    }
    setUploading(true);
    setMessage("Uploading and processing...");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setQuestions(data.questions);
        setCurrent(0);
        setMessage(`✅ Loaded ${data.questions.length} question(s).`);
        setMode("quiz");
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to parse PDF"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    }

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

  const goBack = () => setMode("home");

  return (
    <div className="p-6 font-sans max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">ICAS Science Practice App</h1>

      {mode === "home" && (
        <div className="space-y-4">
          <button
            onClick={() => setMode("upload")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload ICAS PDF
          </button>
          <button
            onClick={() => setMode("quiz")}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={questions.length === 0}
          >
            Take Test
          </button>
        </div>
      )}

      {mode === "upload" && (
        <div>
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
            {uploading ? "Processing..." : "Upload and Extract Questions"}
          </button>
          {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
          <div className="mt-4">
            <button onClick={goBack} className="px-3 py-1 bg-gray-300 rounded">Go to Home</button>
          </div>
        </div>
      )}

      {mode === "quiz" && questions.length > 0 && q && (
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

          <div className="mt-4 space-x-2">
            <button onClick={() => setMode("upload")} className="px-3 py-1 bg-gray-300 rounded">Back</button>
            <button onClick={goBack} className="px-3 py-1 bg-gray-300 rounded">Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}
