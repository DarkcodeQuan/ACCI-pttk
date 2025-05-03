import { useState } from "react";
import RegistrarInfo from "./RegistrarInfo";
import CandidateInfo from "./CandidateInfo";
import ExamSelector from "./ExamSelector";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessModal from "./SuccessModal"; // Đã có sẵn

export default function IndividualForm({ onSubmit }) {
  const [form, setForm] = useState({
    registrarName: "",
    registrarPhone: "",
    registrarEmail: "",
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
  });

  const [selectedExams, setSelectedExams] = useState({});
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState({});

  const handleSubmit = () => {
    const {
      registrarName,
      registrarPhone,
      registrarEmail,
      candidateName,
      candidateEmail,
      candidatePhone,
    } = form;

    if (
      !registrarName.trim() ||
      !registrarPhone.trim() ||
      !registrarEmail.trim() ||
      !candidateName.trim() ||
      !candidateEmail.trim() ||
      !candidatePhone.trim()
    ) {
      setError("Vui lòng điền đầy đủ thông tin người đăng ký và thí sinh!");
      return;
    }

    const selectedExamEntries = Object.entries(selectedExams);
    if (
      selectedExamEntries.length === 0 ||
      selectedExamEntries.some(([_, date]) => !date)
    ) {
      setError("Vui lòng chọn môn và ngày thi cho từng môn.");
      return;
    }

    const submissionData = {
      ...form,
      exams: selectedExams,
    };

    onSubmit(submissionData);
    setSubmittedInfo({ candidateName, selectedExams });
    setShowSuccess(true);
    setError("");
    setForm({
      registrarName: "",
      registrarPhone: "",
      registrarEmail: "",
      candidateName: "",
      candidateEmail: "",
      candidatePhone: "",
    });
    setSelectedExams({});
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-4"> {/* Cập nhật max-w-6xl và padding */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      {showSuccess && (
        <SuccessModal
          candidateName={submittedInfo.candidateName}
          selectedExams={submittedInfo.selectedExams}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <h2 className="font-semibold text-xl">Đăng ký thí sinh tự do</h2>

      <div className="flex flex-col md:flex-row gap-8"> {/* Điều chỉnh gap thành 8 */}
        <div className="flex-1"> {/* Cho phép chia không gian */}
          <RegistrarInfo form={form} setForm={setForm} />
        </div>
        <div className="flex-1"> {/* Cho phép chia không gian */}
          <CandidateInfo form={form} setForm={setForm} />
        </div>
      </div>

      <ExamSelector
        selectedExams={selectedExams}
        setSelectedExams={setSelectedExams}
      />

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:text-gray-200"
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}
