import React, { useState } from "react";
import RegistrationForm from "../Registration/RegistrationForm"; // form cá nhân
import GroupRegistrationForm from "../Registration/GroupForm"; // form nhóm
import RegistrationTable from "./RegistrationTable";

export default function RegistrationPage() {
  const [isGroup, setIsGroup] = useState(false); // Đang dùng lại trạng thái này để điều khiển form
  const [registeredList, setRegisteredList] = useState([]);

  const handleRegister = (data) => {
    // Kiểm tra dữ liệu trống
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.examType ||
      !data.examDate
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // data có thể là object (cá nhân) hoặc array (nhóm)
    if (Array.isArray(data)) {
      setRegisteredList((prev) => [...prev, ...data]);
    } else {
      setRegisteredList((prev) => [...prev, data]);
    }
  };

  return (
    <div className="p-4">
      {/* Các nút chuyển giữa form cá nhân và nhóm */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setIsGroup(false)} // Chuyển sang form cá nhân
          className={`px-4 py-2 rounded ${!isGroup ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Cá nhân
        </button>
        <button
          onClick={() => setIsGroup(true)} // Chuyển sang form nhóm
          className={`px-4 py-2 rounded ${isGroup ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Đăng ký theo nhóm
        </button>
      </div>

      {/* Hiển thị form cá nhân nếu isGroup là false, nếu là true thì hiển thị form nhóm */}
      {isGroup ? (
        <GroupRegistrationForm onSubmit={handleRegister} />
      ) : (
        <RegistrationForm onSubmit={handleRegister} />
      )}

      <div className="mt-6">
        <RegistrationTable data={registeredList} />
      </div>
    </div>
  );
}
