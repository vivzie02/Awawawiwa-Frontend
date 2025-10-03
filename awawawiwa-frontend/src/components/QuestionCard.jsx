import { useState } from 'react';
import QuestionCardExpanded from './QuestionCardExpanded';

export default function QuestionCard({ question, answer, approved, questionId, category, onDelete, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, length = 50) =>
    text.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 cursor-pointer" onClick={() => setIsExpanded(true)}>
      <h3 className="text-md font-semibold text-gray-800 mb-2">{truncateText(question)}</h3>
      <p className="text-gray-600 text-sm mb-3">{truncateText(answer)}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {approved ? 'Approved' : 'Pending'}
        </span>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(questionId);
          }}
          className="text-red-600 text-xs hover:underline cursor-pointer"
        >
          Delete
        </button>
      </div>

      {isExpanded && (
        <QuestionCardExpanded
          questionId={questionId}
          initialQuestion={question}
          initialAnswer={answer}
          approved={approved}
          category={category}
          onClose={() => setIsExpanded(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
    
  );
}
