// ExamSelector.jsx
import React from 'react';

const exams = [
  { id: 'english', label: 'Tiếng Anh' },
  { id: 'cs', label: 'Tin học' },
];

export default function ExamSelector({ selectedExams, setSelectedExams }) {
  const handleCheckboxChange = (examId) => {
    const current = selectedExams[examId] || { selected: false, date: '' };
    const updated = {
      ...selectedExams,
      [examId]: { ...current, selected: !current.selected }
    };
    setSelectedExams(updated);
  };

  const handleDateChange = (examId, date) => {
    const current = selectedExams[examId] || { selected: true, date: '' };
    const updated = {
      ...selectedExams,
      [examId]: { ...current, date }
    };
    setSelectedExams(updated);
  };

  return (
    <div className="space-y-2">
      {exams.map((exam) => (
        <div key={exam.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`exam-${exam.id}`}
            checked={selectedExams[exam.id]?.selected || false}
            onChange={() => handleCheckboxChange(exam.id)}
          />
          <label htmlFor={`exam-${exam.id}`}>{exam.label}</label>

          {/* Hiển thị input ngày nếu đã chọn môn */}
          {selectedExams[exam.id]?.selected && (
            <input
              type="date"
              className="border px-2 py-1 ml-4"
              value={selectedExams[exam.id]?.date || ''}
              onChange={(e) => handleDateChange(exam.id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
