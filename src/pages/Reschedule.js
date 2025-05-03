import React, { useState } from "react";

const initialHistory = [
  {
    examTicket: "EX123",
    caseType: "special",
    reason: "Bệnh viện cấp giấy xác nhận",
    requestedAt: "2025-04-25 14:00",
    newDate: "2025-05-10T09:00",
    status: "Đã duyệt",
  },
];

export default function Reschedule() {
  const [caseType, setCaseType] = useState("special");
  const [formData, setFormData] = useState({
    examTicket: "",
    newExamDate: "",
    reasonDoc: null,
    reasonText: "",
  });
  const [error, setError] = useState("");
  const [history, setHistory] = useState(initialHistory);

  const originalExamDate = new Date("2025-04-30T10:00:00");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const count = history.filter(h => h.examTicket === formData.examTicket).length;
    if (count >= 2) {
      setError("Bạn đã vượt quá số lần gia hạn cho phép (tối đa 2 lần).");
      return;
    }

    const now = new Date();
    if ((originalExamDate - now) / 36e5 < 24) {
      setError("Chỉ được gửi trước giờ thi ít nhất 24 giờ.");
      return;
    }

    if (!formData.examTicket || !formData.newExamDate) {
      setError("Vui lòng điền mã phiếu và thời gian muốn gia hạn.");
      return;
    }
    if (caseType === "special" && !formData.reasonDoc) {
      setError("Vui lòng tải lên giấy tờ minh chứng.");
      return;
    }
    if (caseType === "special" && !formData.reasonText.trim()) {
      setError("Vui lòng nhập lý do chi tiết.");
      return;
    }

    const newEntry = {
      examTicket: formData.examTicket,
      caseType,
      reason: caseType === "special"
        ? formData.reasonText
        : "Gia hạn thông thường (có phí)",
      requestedAt: now.toLocaleString("en-GB", { hour12: false }),
      newDate: formData.newExamDate,
      status: caseType === "special" ? "Đã duyệt" : "Chưa thanh toán phí",
    };

    setHistory(prev => [newEntry, ...prev]);
    setFormData({ examTicket: "", newExamDate: "", reasonDoc: null, reasonText: "" });
    alert("Yêu cầu gia hạn đã gửi!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Tiêu đề nằm ngoài ô trắng */}
      <h1 className="text-2xl font-bold">Gia hạn lịch thi</h1>

      {/* Ô trắng chứa form và lịch sử */}
      <div className="bg-white rounded shadow p-6 space-y-6">
        {/* Bảng lịch sử */}
        <div>
          <h2 className="font-semibold mb-2">Lịch sử gia hạn</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 border">Mã phiếu</th>
                  <th className="px-2 py-1 border">Loại</th>
                  <th className="px-2 py-1 border">Lý do</th>
                  <th className="px-2 py-1 border">Thời gian yêu cầu</th>
                  <th className="px-2 py-1 border">Lịch mới</th>
                  <th className="px-2 py-1 border">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-2 py-1 text-center text-gray-500">
                      Chưa có yêu cầu nào
                    </td>
                  </tr>
                ) : history.map((h, i) => (
                  <tr key={i} className="text-sm">
                    <td className="px-2 py-1 border">{h.examTicket}</td>
                    <td className="px-2 py-1 border">
                      {h.caseType === "special" ? "Đặc biệt" : "Thông thường"}
                    </td>
                    <td className="px-2 py-1 border">{h.reason}</td>
                    <td className="px-2 py-1 border">{h.requestedAt}</td>
                    <td className="px-2 py-1 border">
                      {new Date(h.newDate).toLocaleString("en-GB", { hour12: false })}
                    </td>
                    <td className="px-2 py-1 border">{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form gửi yêu cầu */}
        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded">
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium">Loại yêu cầu</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="block w-full border p-2 rounded mt-1"
            >
              <option value="special">Trường hợp đặc biệt</option>
              <option value="normal">Trường hợp thông thường</option>
            </select>
          </div>

          <div>
            <label className="block">Mã phiếu dự thi</label>
            <input
              type="text"
              name="examTicket"
              value={formData.examTicket}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {caseType === "special" && (
            <>
              <div>
                <label className="block">Giấy tờ minh chứng</label>
                <input
                  type="file"
                  name="reasonDoc"
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block">Lý do chi tiết</label>
                <textarea
                  name="reasonText"
                  value={formData.reasonText}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border p-2 rounded"
                  placeholder="Ví dụ: Bệnh viện cấp giấy..."
                />
              </div>
            </>
          )}

          <div>
            <label className="block">Ngày giờ muốn gia hạn</label>
            <input
              type="datetime-local"
              name="newExamDate"
              value={formData.newExamDate}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
          >
            Gửi yêu cầu gia hạn
          </button>
        </form>
      </div>
    </div>
  );
}
