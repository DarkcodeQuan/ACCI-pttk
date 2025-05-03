import { useState } from "react";

export default function Dashboard() {
  const [view, setView] = useState("individual"); // State to track view (individual or group)

  // Sample individual registrations data
  const [individualRegistrations] = useState([
    { 
      name: "Nguyễn Văn A", 
      email: "nguyenvana@example.com",
      examType: "Tin học",
      paymentStatus: "Chưa thanh toán"
    },
    { 
      name: "Trần Thị B", 
      email: "tranthib@example.com",
      examType: "Ngoại ngữ",
      paymentStatus: "Chưa thanh toán",
    },
    { 
      name: "Lê Văn C", 
      email: "levanc@example.com",
      examType: "Tin học",
      paymentStatus: "Đã thanh toán",
    },
    { 
      name: "Phạm Văn D", 
      email: "phamvand@example.com",
      examType: "Ngoại ngữ",
      paymentStatus: "Đã thanh toán",
    },
  ]);

  // Sample group registrations data
  const [groupRegistrations] = useState([
    {
      groupName: "Nhóm Alpha",
      email: "alpha@group.com",
      examType: "Tin học",
      paymentStatus: "Đã thanh toán",
      members: [
        { name: "Nguyễn Văn X", email: "nguyenx@example.com" },
        { name: "Trần Thị Y", email: "trany@example.com" }        
      ],
    },
    {
      groupName: "Nhóm Beta",
      email: "beta@group.com",
      examType: "Ngoại ngữ",
      paymentStatus: "Chưa thanh toán",
      members: [
        { name: "Lê Văn Z", email: "lez@example.com" },
        { name: "Phạm Thị W", email: "phamw@example.com" },
      ],
    },
  ]);

  return (
    <div className="p-8">
      <div>
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Danh sách đăng ký
        </h1>

        {/* Buttons to switch views */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setView("individual")}
            className={`px-4 py-2 rounded font-semibold ${
              view === "individual"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Cá nhân
          </button>
          <button
            onClick={() => setView("group")}
            className={`px-4 py-2 rounded font-semibold ${
              view === "group"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Nhóm
          </button>
        </div>

        {/* Individual View */}
        {view === "individual" && (
          <div>
            {individualRegistrations.length === 0 ? (
              <h2 className="text-xl text-gray-500 text-center">
                Chưa có dữ liệu đăng ký
              </h2>
            ) : (
              <ul className="space-y-4">
                {individualRegistrations.map((registration, index) => (
                  <li
                    key={index}
                    className="text-lg flex flex-col gap-1 border p-4 rounded shadow"
                  >
                    <span>
                      <strong>Họ tên:</strong> {registration.name}
                    </span>
                    <span>
                      <strong>Email:</strong> {registration.email}
                    </span>
                    <span>
                      <strong>Môn thi:</strong>{" "}
                      <span
                        className={
                          registration.examType === "Tin học"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }
                      >
                        {registration.examType}
                      </span>
                    </span>
                    <span>
                      <strong>Tình trạng:</strong>{" "}
                      <span
                        className={
                          registration.paymentStatus === "Đã thanh toán"
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {registration.paymentStatus}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Group View */}
        {view === "group" && (
          <div>
            {groupRegistrations.length === 0 ? (
              <h2 className="text-xl text-gray-500 text-center">
                Chưa có dữ liệu đăng ký nhóm
              </h2>
            ) : (
              <ul className="space-y-4">
                {groupRegistrations.map((group, index) => (
                  <li
                    key={index}
                    className="text-lg border p-4 rounded shadow"
                  >
                    <div className="flex flex-col gap-1">
                      <span>
                        <strong>Tên nhóm:</strong> {group.groupName}
                      </span>
                      <span>
                        <strong>Email nhóm:</strong> {group.email}
                      </span>
                      <span>
                        <strong>Môn thi:</strong>{" "}
                        <span
                          className={
                            group.examType === "Tin học"
                              ? "text-blue-600"
                              : "text-purple-600"
                          }
                        >
                          {group.examType}
                        </span>
                      </span>
                      <span>
                        <strong>Tình trạng:</strong>{" "}
                        <span
                          className={
                            group.paymentStatus === "Đã thanh toán"
                              ? "text-green-600 font-bold"
                              : "text-red-600 font-bold"
                          }
                        >
                          {group.paymentStatus}
                        </span>
                      </span>
                      <div className="mt-4">
                        <strong>Danh sách thành viên:</strong>
                        <table className="w-full border mt-2 text-left">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border p-2">Họ tên</th>
                              <th className="border p-2">Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.members.map((member, memberIndex) => (
                              <tr key={memberIndex}>
                                <td className="border p-2">{member.name}</td>
                                <td className="border p-2">{member.email}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}