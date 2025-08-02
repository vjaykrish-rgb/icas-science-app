import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm({ multiples: false });
  form.uploadDir = path.join(process.cwd(), "/tmp");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form" });
    }

    try {
      const pdfPath = files.pdf.filepath;
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdfParse(dataBuffer);
      const text = data.text;

      const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
      const questions = [];
      let current = null;

      for (let line of lines) {
        if (/^\d+\./.test(line)) {
          if (current) {
            current.answer = null;
            current.explanation = "";
            current.image = null;
            questions.push(current);
          }
          current = { question: line.replace(/^\d+\.\s*/, ""), choices: [] };
        } else if (/^[A-D]\./.test(line)) {
          current?.choices.push(line.slice(2).trim());
        }
      }
      if (current) {
        current.answer = null;
        current.explanation = "";
        current.image = null;
        questions.push(current);
      }

      res.status(200).json({ questions });
    } catch (error) {
      console.error("PDF parsing error:", error);
      res.status(500).json({ error: "Failed to parse PDF." });
    }
  });
}
