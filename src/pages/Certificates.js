import { useState } from "react";
import { jsPDF } from "jspdf";

const mockCertificates = [
  {
    ticket: "ACPI001",
    name: "Nguyễn Văn A",
    examType: "English",
    score: 8.5,
    status: "Đạt",
  },
  {
    ticket: "ACPI002",
    name: "Trần Thị B",
    examType: "Computer",
    score: 4.5,
    status: "Rớt",
  },
  {
    ticket: "ACPI003",
    name: "Lê Văn C",
    examType: "English",
    score: 9.0,
    status: "Đạt",
  },
];

// Hàm chuyển tên có dấu sang không dấu
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export default function Certificates() {
  const [searchTerm, setSearchTerm] = useState("");

  const generateCertificatePDF = (data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const center = pageWidth / 2;

    // Tiêu đề chứng chỉ
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("CERTIFICATE OF ACHIEVEMENT", center, margin + 20, { align: "center" });

    // Khoảng cách giữa các phần
    const lineHeight = 10;
    let yPosition = margin + 40;

    // Phần thông tin chung
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text("This certifies that", center, yPosition, { align: "center" });
    yPosition += lineHeight;

    // Họ tên người nhận chứng chỉ
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text(removeVietnameseTones(data.name), center, yPosition, { align: "center" });
    yPosition += 20;

    // Thông tin kỳ thi
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`has completed the exam in: ${data.examType}`, center, yPosition, { align: "center" });
    yPosition += lineHeight;
    doc.text(`with the score of: ${data.score}`, center, yPosition, { align: "center" });
    yPosition += lineHeight + 20;

    // Phần thông tin thêm
    doc.setFontSize(12);
    doc.text("ACPI English and Informatics Center", center, yPosition, { align: "center" });
    yPosition += lineHeight;
    doc.text("Issued on: " + new Date().toLocaleDateString("en-US"), center, yPosition, { align: "center" });
    yPosition += lineHeight + 10;

    // Thêm đường kẻ ngăn cách
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Thêm chữ ký (có thể thay thế bằng chữ ký thật nếu có)
    doc.setFontSize(12);
    doc.text("Signature", center, yPosition, { align: "center" });

    // Tạo file PDF
    doc.save(`${data.ticket}_certificate.pdf`);
  };

  const filteredCertificates = mockCertificates.filter((cert) =>
    cert.ticket.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tra cứu chứng chỉ</h1>
      <input
        type="text"
        placeholder="Nhập mã dự thi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full mb-6"
      />

      {filteredCertificates.length > 0 ? (
        <div className="space-y-4">
          {filteredCertificates.map((cert) => (
            <div key={cert.ticket} className="border p-4 rounded shadow bg-white">
              <p>
                <strong>Mã dự thi:</strong> {cert.ticket}
              </p>
              <p>
                <strong>Họ tên:</strong> {cert.name}
              </p>
              <p>
                <strong>Môn thi:</strong> {cert.examType}
              </p>
              <p>
                <strong>Điểm:</strong> {cert.score}
              </p>
              {cert.status === "Đạt" ? (
                <button
                  onClick={() => generateCertificatePDF(cert)}
                  className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:text-gray-200"
                >
                  Tải chứng chỉ PDF
                </button>
              ) : (
                <p className="italic text-gray-500 mt-2">
                  Thí sinh không đủ điều kiện nhận chứng chỉ.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Không tìm thấy chứng chỉ phù hợp.</p>
      )}
    </div>
  );
}
