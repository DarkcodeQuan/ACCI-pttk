export default function CandidateInfo({ form, setForm }) {
  return (
    <div className="border p-4 rounded bg-white shadow mb-4">
      <h3 className="font-semibold mb-2">Thông tin người dự thi</h3>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Họ và tên người dự thi"
        value={form.candidateName}
        onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Số điện thoại người dự thi"
        value={form.candidatePhone}
        onChange={(e) => setForm({ ...form, candidatePhone: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email người dự thi"
        value={form.candidateEmail}
        onChange={(e) => setForm({ ...form, candidateEmail: e.target.value })}
      />
    </div>
  );
}
