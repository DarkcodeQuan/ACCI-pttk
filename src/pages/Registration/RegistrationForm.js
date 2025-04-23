import { useState } from "react";

export default function RegistrationForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    examType: "Ngoại ngữ",
    examDate: "",
  });

  const handleSubmit = () => {
    onSubmit(form);
    setForm({
      name: "",
      email: "",
      phone: "",
      examType: "Ngoại ngữ",
      examDate: "",
    });
  };

  return (
    <div className="space-y-2 max-w-xl mx-auto px-4">
      <h2 className="font-semibold text-lg">Individual Registration</h2>

      <input
        className="border p-2 w-full"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={form.examType}
        onChange={(e) => setForm({ ...form, examType: e.target.value })}
      >
        <option value="Ngoại ngữ">Ngoại ngữ</option>
        <option value="Tin học">Tin học</option>
      </select>
      <input
        type="date"
        className="border p-2 w-full"
        value={form.examDate}
        onChange={(e) => setForm({ ...form, examDate: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
