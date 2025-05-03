import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";

export default function GroupForm({ onSubmit }) {
  const [form, setForm] = useState({
    groupName: "",
    groupEmail: "",
    groupPhone: "",
    examType: "Ngoại ngữ",
    examDate: "",
    participants: [{ name: "", email: "", phone: "" }],
  });

  const [error, setError] = useState("");

  const handleParticipantChange = (index, e) => {
    const newParticipants = [...form.participants];
    newParticipants[index][e.target.name] = e.target.value;
    setForm({ ...form, participants: newParticipants });
  };

  const handleAddParticipant = () => {
    setForm({
      ...form,
      participants: [...form.participants, { name: "", email: "", phone: "" }],
    });
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = form.participants.filter((_, i) => i !== index);
    setForm({ ...form, participants: newParticipants });
  };

  const handleSubmit = () => {
    // Kiểm tra thông tin nhóm
    if (!form.groupName || !form.groupEmail || !form.groupPhone || !form.examType || !form.examDate) {
      setError("Vui lòng điền đầy đủ thông tin nhóm!");
      return;
    }

    // Kiểm tra thông tin của từng thành viên
    for (const participant of form.participants) {
      if (!participant.name || !participant.email || !participant.phone) {
        setError("Vui lòng điền đầy đủ thông tin cho tất cả thành viên!");
        return;
      }
    }

    onSubmit(form); // Gửi dữ liệu lên component cha
    setForm({
      groupName: "",
      groupEmail: "",
      groupPhone: "",
      examType: "Ngoại ngữ",
      examDate: "",
      participants: [{ name: "", email: "", phone: "" }],
    });
  };

  return (
    <div className="space-y-2 max-w-xl mx-auto">
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}  

      <h2 className="font-semibold text-lg">Group Registration</h2>

      <input
        className="border p-2 w-full"
        placeholder="Group Name"
        value={form.groupName}
        onChange={(e) => setForm({ ...form, groupName: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Group Email"
        value={form.groupEmail}
        onChange={(e) => setForm({ ...form, groupEmail: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Group Phone"
        value={form.groupPhone}
        onChange={(e) => setForm({ ...form, groupPhone: e.target.value })}
      />

      {/* Exam Type */}
      <select
        className="border p-2 w-full"
        value={form.examType}
        onChange={(e) => setForm({ ...form, examType: e.target.value })}
      >
        <option value="Ngoại ngữ">Ngoại ngữ</option>
        <option value="Tin học">Tin học</option>
      </select>

      {/* Exam Date */}
      <input
        type="date"
        className="border p-2 w-full"
        value={form.examDate}
        onChange={(e) => setForm({ ...form, examDate: e.target.value })}
      />

      <h3 className="font-semibold text-lg mt-4">Participants</h3>

      {/* Danh sách thành viên */}
      {form.participants.map((participant, index) => (
        <div key={index} className="space-y-2 mb-4">
          <input
            className="border p-2 w-full"
            placeholder={`Participant ${index + 1} Name`}
            name="name"
            value={participant.name}
            onChange={(e) => handleParticipantChange(index, e)}
          />
          <input
            className="border p-2 w-full"
            placeholder={`Participant ${index + 1} Email`}
            name="email"
            value={participant.email}
            onChange={(e) => handleParticipantChange(index, e)}
          />
          <input
            className="border p-2 w-full"
            placeholder={`Participant ${index + 1} Phone`}
            name="phone"
            value={participant.phone}
            onChange={(e) => handleParticipantChange(index, e)}
          />

          {/* Xóa thành viên */}
          {form.participants.length > 1 && (
            <button
              className="text-red-500"
              type="button"
              onClick={() => handleRemoveParticipant(index)}
            >
              Remove Participant
            </button>
          )}
        </div>
      ))}

      <div className="mt-4 flex space-x-2">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded mt-4"
          onClick={handleAddParticipant}
        >
          Add Participant
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gray-800 text-white rounded mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
