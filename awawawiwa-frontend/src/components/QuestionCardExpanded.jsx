import { useState } from "react";
import { PatchQuestionById } from "../services/QuestionService";

export default function QuestionCardExpanded({ questionId, initialQuestion, initialAnswer, approved, category, onClose, onUpdate }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      // update backend
      await PatchQuestionById(questionId, { question, answer, approved, category });
      // update frontend state via parent callback
      onUpdate(questionId, { question, answer });
      onClose();
    } catch (err) {
      console.error("Error updating question:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur / background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-2xl z-10" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Question</h2>

        <label className="block mb-2 text-sm font-medium">Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          rows={3}
        />

        <label className="block mb-2 text-sm font-medium">Answer</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          rows={4}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
