import { useState } from "react";

export default function Dashboard() {
  const [registrations] = useState([
    { 
      name: "Nguyễn Văn A", 
      email: "nguyenvana@example.com",
      examType: "Tin học",
      paymentStatus: "Đã thanh toán"
    },
    { 
      name: "Trần Thị B", 
      email: "tranthib@example.com",
      examType: "Ngoại ngữ",
      paymentStatus: "Chưa thanh toán"
    },
    { 
      name: "Lê Văn C", 
      email: "levanc@example.com",
      examType: "Tin học",
      paymentStatus: "Đã thanh toán"
    },
  ]);

  return (
    <div className="p-8">
      <div>
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Danh sách đăng ký
        </h1>

        {/* Danh sách */}
        {registrations.length === 0 ? (
          <h2 className="text-xl text-gray-500 text-center">Chưa có dữ liệu đăng ký</h2>
        ) : (
          <ul className="space-y-4">
            {registrations.map((registration, index) => (
              <li key={index} className="text-lg flex flex-col gap-1 border p-4 rounded shadow">
                <span><strong>Họ tên:</strong> {registration.name}</span>
                <span><strong>Email:</strong> {registration.email}</span>
                
                {/* Môn thi */}
                <span>
                  <strong>Môn thi:</strong>{" "}
                  <span className={registration.examType === "Tin học" ? "text-blue-600" : "text-purple-600"}>
                    {registration.examType}
                  </span>
                </span>

                {/* Tình trạng thanh toán */}
                <span>
                  <strong>Tình trạng:</strong>{" "}
                  <span className={registration.paymentStatus === "Đã thanh toán" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {registration.paymentStatus}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
