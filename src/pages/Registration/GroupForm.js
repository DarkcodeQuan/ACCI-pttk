import React, { useState } from 'react';
import CandidateInfo from './CandidateInfo';
import ExamSelector from './ExamSelector';
import ErrorMessage from "../../components/ErrorMessage"; 

export default function GroupForm() {
  const [candidates, setCandidates] = useState([]);
  const [unit, setUnit] = useState({
    unitName: '',
    unitEmail: '',
    unitPhone: '',
  });

  const [error, setError] = useState("");

  const addCandidate = () => {
    setCandidates((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        form: {
          candidateName: '',
          candidatePhone: '',
          candidateEmail: '',
        },
        selectedExams: {},
      },
    ]);
  };

  const removeCandidate = (id) => {
    const updated = candidates.filter((c) => c.id !== id).map((c, index) => ({ ...c, id: index + 1 }));
    setCandidates(updated);
  };

  const updateForm = (id, newForm) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, form: newForm } : c)));
  };

  const updateExam = (id, newExams) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, selectedExams: newExams } : c)));
  };

  const handleSubmit = () => {
    // Kiểm tra thông tin đơn vị
    const { unitName, unitEmail, unitPhone } = unit;
    if (!unitName.trim() || !unitEmail.trim() || !unitPhone.trim()) {
      setError("Vui lòng điền đầy đủ thông tin đơn vị!");
      return;
    }

    // Kiểm tra xem có thí sinh hay không
    if (candidates.length === 0) {
      setError("Vui lòng thêm ít nhất một thí sinh!");
      return;
    }

    // Kiểm tra từng thí sinh
    for (let candidate of candidates) {
      const { candidateName, candidatePhone, candidateEmail } = candidate.form;
      if (!candidateName.trim() || !candidatePhone.trim() || !candidateEmail.trim()) {
        setError("Vui lòng điền đầy đủ thông tin thí sinh!");
        return;
      }

      const selectedExamEntries = Object.entries(candidate.selectedExams);
      if (selectedExamEntries.length === 0 || selectedExamEntries.some(([_, date]) => !date)) {
        setError("Vui lòng chọn môn và ngày thi cho từng môn.");
        return;
      }
    }

    // Nếu không có lỗi, gửi dữ liệu
    setError("");  // Reset lỗi
    // Tiến hành xử lý đăng ký cho nhóm thí sinh ở đây
    console.log("Thông tin hợp lệ, gửi dữ liệu...");

    // Sau khi gửi thành công, có thể làm lại UI hoặc reset các trạng thái
    setCandidates([]);
    setUnit({ unitName: '', unitEmail: '', unitPhone: '' });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4">
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      <h2 className="font-semibold text-xl">Đăng ký thí sinh theo đơn vị</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Bên trái: Thông tin đơn vị và phần số thí sinh */}
        <div className="flex-1 space-y-4">
          <div className="bg-white p-4 border rounded shadow h-[400px] overflow-y-auto">
            <label className="block font-semibold mb-2">Thông tin đơn vị</label>
            <input
              type="text"
              value={unit.unitName}
              onChange={(e) => setUnit({ ...unit, unitName: e.target.value })}
              placeholder="Nhập tên đơn vị"
              className="border p-2 w-full mb-4"
            />
            <input
              type="email"
              value={unit.unitEmail}
              onChange={(e) => setUnit({ ...unit, unitEmail: e.target.value })}
              placeholder="Email"
              className="border p-2 w-full mb-4"
            />
            <input
              type="text"
              value={unit.unitPhone}
              onChange={(e) => setUnit({ ...unit, unitPhone: e.target.value })}
              placeholder="Số điện thoại"
              className="border p-2 w-full mb-4"
            />

            <button
              onClick={addCandidate}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Thêm thí sinh
            </button>

            {/* Phần số thí sinh: Header cố định bên trái */}
            <div className="sticky top-0 bg-white z-10 mt-4">
              <p className="text-sm text-gray-500 mb-2">Số thí sinh: {candidates.length}</p>
            </div>
          </div>
        </div>

        {/* Bên phải: Danh sách thí sinh */}
        <div className="flex-1">
          <div className="bg-white p-4 border rounded shadow h-[400px] overflow-y-auto">
            <label className="block font-semibold mb-2">Danh sách thí sinh</label>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="p-4 border rounded bg-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Thí sinh {candidate.id}</h3>
                    <button
                      onClick={() => removeCandidate(candidate.id)}
                      className="text-red-500"
                    >
                      Xóa
                    </button>
                  </div>

                  <CandidateInfo
                    form={candidate.form}
                    setForm={(newForm) => updateForm(candidate.id, newForm)}
                  />
                  <ExamSelector
                    selectedExams={candidate.selectedExams}
                    setSelectedExams={(newExams) => updateExam(candidate.id, newExams)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nút đăng ký: cố định bên dưới */}
      <div className="text-center">
        <button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:text-gray-200">
          Đăng ký
        </button>
      </div>
    </div>
  );
}
