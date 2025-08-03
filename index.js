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

  const goBack = () => setMode("hom
