import React, { useState } from "react";

const Reschedule = () => {
  const [caseType, setCaseType] = useState("special");
  const [formData, setFormData] = useState({
    examTicket: "",
    newExamDate: "",
    reasonDoc: null,
  });
  const [error, setError] = useState("");

  // Giả lập dữ liệu gốc
  const originalExamDate = new Date("2025-04-30T10:00:00");
  const rescheduleCount = 1; // Giả sử đã 1 lần gia hạn

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

    // Kiểm tra số lần gia hạn
    if (rescheduleCount >= 2) {
      setError("Bạn đã vượt quá số lần gia hạn cho phép (tối đa 2 lần).");
      return;
    }

    // Kiểm tra thời điểm gửi yêu cầu
    const now = new Date();
    const hoursBeforeExam = (originalExamDate - now) / (1000 * 60 * 60);
    if (hoursBeforeExam < 24) {
      setError("Bạn chỉ được gửi yêu cầu gia hạn trước giờ thi ít nhất 24 giờ.");
      return;
    }

    // Kiểm tra các trường bắt buộc
    if (!formData.examTicket || !formData.newExamDate) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (caseType === "special" && !formData.reasonDoc) {
      setError("Vui lòng tải lên giấy tờ minh chứng.");
      return;
    }

    console.log("Yêu cầu hợp lệ:", formData);
    alert("Gửi yêu cầu thành công!");
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Gia hạn lịch thi 🚀</h1>

      {error && (
        <div className="mb-4 text-red-600 font-medium bg-red-100 p-2 rounded">
          ⚠️ {error}
        </div>
      )}

      <div className="mb-4">
        <label className="font-medium">Loại yêu cầu:</label>
        <select
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          className="block w-full border p-2 rounded mt-1"
        >
          <option value="special">Trường hợp đặc biệt</option>
          <option value="normal">Trường hợp thông thường</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Mã phiếu dự thi:</label>
          <input
            type="text"
            name="examTicket"
            value={formData.examTicket}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {caseType === "special" && (
          <div className="mb-4">
            <label className="block">Tải giấy tờ minh chứng:</label>
            <input
              type="file"
              name="reasonDoc"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block">Thời gian muốn gia hạn:</label>
          <input
            type="datetime-local"
            name="newExamDate"
            value={formData.newExamDate}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gửi yêu cầu gia hạn
        </button>
      </form>
    </div>
  );
};

export default Reschedule;
