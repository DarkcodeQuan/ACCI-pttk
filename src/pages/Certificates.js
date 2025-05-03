import { useState } from "react";
import { jsPDF } from "jspdf";

const mockCertificates = [
  {
    ticket: "ACC123456",
    name: "Nguyễn Văn A",
    examType: "Tin học",
    score: 85,
    status: "Đạt",
  },
  {
    ticket: "ACC123457",
    name: "Trần Thị B",
    examType: "Ngoại ngữ",
    score: 72,
    status: "Đạt",
  },
  {
    ticket: "ACC123458",
    name: "Lê Văn C",
    examType: "Tin học",
    score: 59,
    status: "Không đạt",
  },
];

export default function Certificates() {
  const [ticketCode, setTicketCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const found = mockCertificates.find((c) => c.ticket === ticketCode.trim());
    if (!found) {
      setResult(null);
      setError("Không tìm thấy mã phiếu.");
    } else {
      setResult(found);
      setError("");
    }
  };

  const generateCertificatePDF = (data) => {
    const doc = new jsPDF();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CHỨNG CHỈ HOÀN THÀNH", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Họ tên: ${data.name}`, 20, 60);
    doc.text(`Môn thi: ${data.examType}`, 20, 70);
    doc.text(`Điểm: ${data.score}`, 20, 80);
    doc.text(`Kết quả: ${data.status}`, 20, 90);

    doc.setFontSize(10);
    doc.text("Trung tâm Anh ngữ và Tin học ACCI", 20, 110);
    doc.text("Chứng chỉ được cấp ngày: " + new Date().toLocaleDateString(), 20, 120);

    doc.save(`${data.ticket}_certificate.pdf`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trang chứng chỉ 🚀</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Nhập mã phiếu dự thi:</label>
        <input
          type="text"
          value={ticketCode}
          onChange={(e) => setTicketCode(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Ví dụ: ACC123456"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tra cứu
      </button>

      {error && (
        <div className="text-red-600 font-medium mt-4 bg-red-100 p-2 rounded">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="mt-6 border p-4 rounded shadow space-y-2 bg-white">
          <h2 className="text-xl font-semibold text-green-700">Kết quả:</h2>
          <p><strong>Họ tên:</strong> {result.name}</p>
          <p><strong>Môn thi:</strong> {result.examType}</p>
          <p><strong>Điểm:</strong> {result.score}</p>
          <p>
            <strong>Kết quả:</strong>{" "}
            <span className={result.status === "Đạt" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {result.status}
            </span>
          </p>

          {result.status === "Đạt" && (
            <button
              onClick={() => generateCertificatePDF(result)}
              className="bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700"
            >
              Tạo & Tải chứng chỉ PDF
            </button>
          )}

          {result.status !== "Đạt" && (
            <p className="text-sm text-gray-600 italic mt-2">
              Không thể in chứng chỉ vì kết quả không đạt.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
