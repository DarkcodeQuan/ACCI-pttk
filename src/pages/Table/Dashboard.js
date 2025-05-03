import { useState } from "react";

export default function Dashboard() {
  const [view, setView] = useState("individual");

  const individualRegistrations = [
    { 
      name: "Nguyễn Văn A", 
      email: "nguyenvana@example.com",
      examTypes: ["Tin học", "Ngoại ngữ"],
      paymentStatus: "Chưa thanh toán",
      examSchedules: []
    },
    { 
      name: "Trần Thị B", 
      email: "tranthib@example.com",
      examTypes: ["Ngoại ngữ"],
      paymentStatus: "Chưa thanh toán",
      examSchedules: []
    },
    { 
      name: "Lê Văn C", 
      email: "levanc@example.com",
      examTypes: ["Tin học"],
      paymentStatus: "Đã thanh toán",
      examSchedules: [
        // Tin học → Thứ Bảy
        { date: "2025-05-17", time: "09:00", room: "A101" }
      ]
    },
    { 
      name: "Phạm Văn D", 
      email: "phamvand@example.com",
      examTypes: ["Ngoại ngữ", "Tin học"],
      paymentStatus: "Đã thanh toán",
      examSchedules: [
        // Ngoại ngữ → Chủ Nhật
        { date: "2025-05-18", time: "13:00", room: "B202" },
        // Tin học → Thứ Bảy
        { date: "2025-05-24", time: "09:00", room: "C303" }
      ]
    },
    {
      name: "Đỗ Thị E",
      email: "dothie@example.com",
      examTypes: ["Ngoại ngữ"],
      paymentStatus: "Chưa thanh toán",
      examSchedules: []
    },
    {
      name: "Hoàng Văn F",
      email: "hoangf@example.com",
      examTypes: ["Tin học","Ngoại ngữ"],
      paymentStatus: "Đã thanh toán",
      examSchedules: [
        // Tin học
        { date: "2025-05-31", time: "14:00", room: "D404" },
        // Ngoại ngữ
        { date: "2025-06-01", time: "08:00", room: "E505" }
      ]
    },
  ];

  const groupRegistrations = [
    {
      groupName: "Trường THPT Ngô A",
      email: "thptngoa@eduexamples.vn",
      examTypes: ["Tin học","Ngoại ngữ"],
      paymentStatus: "Đã thanh toán",
      examSchedules: [
        // Tin học
        { date: "2025-05-17", time: "09:00", room: "F606" },
        // Ngoại ngữ
        { date: "2025-05-18", time: "13:00", room: "G707" }
      ],
      members: [
        { name: "Nguyễn Văn X", email: "nguyenx@example.com" },
        { name: "Trần Thị Y",    email: "trany@example.com" },
        { name: "Lý Văn Z",      email: "lyz@example.com" },
      ],
    },
    {
      groupName: "Trung tâm Anh ngữ Wise English",
      email: "wiseenglishcenter@edu.vn",
      examTypes: ["Ngoại ngữ"],
      paymentStatus: "Chưa thanh toán",
      examSchedules: [],
      members: [
        { name: "Lê Văn Z",      email: "lez@example.com" },
        { name: "Phạm Thị W",    email: "phamw@example.com" },
        { name: "Ngô Văn Q",     email: "ngoq@example.com" },
        { name: "Dương Thị P",   email: "duongp@example.com" },
      ],
    },
    {
      groupName: "Trung tâm Tin học ĐH KHTN",
      email: "bachkhoa@itcenter.vn",
      examTypes: ["Tin học"],
      paymentStatus: "Đã thanh toán",
      examSchedules: [
        { date: "2025-05-24", time: "10:00", room: "H808" }
      ],
      members: [
        { name: "Bùi Văn H",     email: "buih@example.com" },
        { name: "Đinh Thị J",    email: "dinhj@example.com" },
        { name: "Trương Văn K",  email: "truongk@example.com" },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Danh sách đăng ký</h1>

      {/* Chọn view */}
      <div className="flex space-x-4">
        <button
          onClick={() => setView("individual")}
          className={`px-4 py-2 rounded font-semibold ${
            view==="individual"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Cá nhân
        </button>
        <button
          onClick={() => setView("group")}
          className={`px-4 py-2 rounded font-semibold ${
            view==="group"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Nhóm
        </button>
      </div>

      {/* Individual View */}
      {view === "individual" && (
        <ul className="space-y-4">
          {individualRegistrations.map((reg, idx) => (
            <li key={idx} className="border p-4 rounded bg-white space-y-2">
              <div><strong>Họ tên:</strong> {reg.name}</div>
              <div><strong>Email:</strong> {reg.email}</div>
              <div><strong>Các môn thi:</strong> {reg.examTypes.join(", ")}</div>
              <div>
                <strong>Tình trạng:</strong>{" "}
                <span className={reg.paymentStatus==="Đã thanh toán"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
                }>
                  {reg.paymentStatus}
                </span>
              </div>

              {/* Lịch thi, chỉ khi đã thanh toán */}
              {reg.paymentStatus==="Đã thanh toán" && reg.examSchedules.length>0 && (
                <div className="mt-2 space-y-1">
                  <strong>Lịch thi:</strong>
                  <ul className="ml-4 list-none space-y-1">
                    {reg.examSchedules.map((s,i) => {
                      const type = reg.examTypes[i];
                      const isIT = type==="Tin học";
                      return (
                        <li
                          key={i}
                          className={`p-2 rounded border flex justify-between items-center ${
                            isIT
                              ? "bg-blue-50 border-blue-300"
                              : "bg-purple-50 border-purple-300"
                          }`}
                        >
                          <span className="font-semibold">{type}</span>
                          <span className="text-sm">
                            {s.date} lúc <span className="italic">{s.time}</span>, phòng{" "}
                            <span className="underline">{s.room}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Group View */}
      {view === "group" && (
        <ul className="space-y-4">
          {groupRegistrations.map((group, idx) => (
            <li key={idx} className="border p-4 rounded bg-white space-y-2">
              <div><strong>Đơn vị:</strong> {group.groupName}</div>
              <div><strong>Email đơn vị:</strong> {group.email}</div>
              <div><strong>Các môn thi:</strong> {group.examTypes.join(", ")}</div>
              <div>
                <strong>Tình trạng:</strong>{" "}
                <span className={group.paymentStatus==="Đã thanh toán"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
                }>
                  {group.paymentStatus}
                </span>
              </div>

              {/* Lịch thi chung */}
              {group.paymentStatus==="Đã thanh toán" && group.examSchedules.length>0 && (
                <div className="mt-2 space-y-1">
                  <strong>Lịch thi chung:</strong>
                  <ul className="ml-4 list-none space-y-1">
                    {group.examSchedules.map((s,i) => {
                      const type = group.examTypes[i];
                      const isIT = type==="Tin học";
                      return (
                        <li
                          key={i}
                          className={`p-2 rounded border flex justify-between items-center ${
                            isIT
                              ? "bg-blue-50 border-blue-300"
                              : "bg-purple-50 border-purple-300"
                          }`}
                        >
                          <span className="font-semibold">{type}</span>
                          <span className="text-sm">
                            {s.date} lúc <span className="italic">{s.time}</span>, phòng{" "}
                            <span className="underline">{s.room}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Danh sách thành viên */}
              <div className="mt-4">
                <strong>Thành viên:</strong>
                <table className="w-full border mt-2 text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Họ tên</th>
                      <th className="border p-2">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((m,i)=>(
                      <tr key={i}>
                        <td className="border p-2">{m.name}</td>
                        <td className="border p-2">{m.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
