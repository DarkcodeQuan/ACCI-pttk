import { useState } from "react";

export default function Dashboard() {
  const [registrations] = useState([
    { 
      name: "Nguyễn Văn A", 
      email: "nguyenvana@example.com",
      examType: "Tin học",
      paymentStatus: "Đã thanh toán",
      groupName: "" // cá nhân
    },
    { 
      name: "Trần Thị B", 
      email: "tranthib@example.com",
      examType: "Ngoại ngữ",
      paymentStatus: "Chưa thanh toán",
      groupName: "Nhóm Alpha"
    },
    { 
      name: "Lê Văn C", 
      email: "levanc@example.com",
      examType: "Tin học",
      paymentStatus: "Đã thanh toán",
      groupName: "" // cá nhân
    },
    { 
      name: "Phạm Văn D", 
      email: "phamvand@example.com",
      examType: "Ngoại ngữ",
      paymentStatus: "Đã thanh toán",
      groupName: "Nhóm Beta"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegistrations = registrations.filter((r) => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.groupName ? r.groupName.toLowerCase() : "cá nhân").includes(searchTerm.toLowerCase()) ||
    r.examType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div>
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Danh sách đăng ký
        </h1>

        {/* Tìm kiếm */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-64"
          />
        </div>

        {/* Bảng */}
        {filteredRegistrations.length === 0 ? (
          <h2 className="text-xl text-gray-500 text-center">Không tìm thấy kết quả</h2>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300 text-left">Họ tên</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Nhóm đăng ký</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Môn thi</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Tình trạng thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition-colors">
                    <td className="px-4 py-2 border border-gray-300">{registration.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{registration.email}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {registration.groupName ? registration.groupName : "Cá nhân"}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <span
                        className={
                          registration.examType === "Tin học"
                            ? "bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded"
                            : "bg-purple-100 text-purple-700 font-semibold px-2 py-1 rounded"
                        }
                      >
                        {registration.examType}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <span className={registration.paymentStatus === "Đã thanh toán" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {registration.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
