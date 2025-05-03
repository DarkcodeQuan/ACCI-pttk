// src/pages/Payment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // ==== DỮ LIỆU CỨNG ====
  // Thí sinh cá nhân
  const individualRegistrations = [
    { examId: 'EX-IND-1', name: "Nguyễn Văn A", email: "nguyenvana@example.com", 
      examTypes: ["Tin học","Ngoại ngữ"], paymentStatus: "Chưa thanh toán" },
    { examId: 'EX-IND-2', name: "Trần Thị B", email: "tranthib@example.com", 
      examTypes: ["Ngoại ngữ"], paymentStatus: "Chưa thanh toán" },
    { examId: 'EX-IND-3', name: "Lê Văn C", email: "levanc@example.com", 
      examTypes: ["Tin học"], paymentStatus: "Đã thanh toán" },
    { examId: 'EX-IND-4', name: "Phạm Văn D", email: "phamvand@example.com", 
      examTypes: ["Ngoại ngữ","Tin học"], paymentStatus: "Đã thanh toán" },
    { examId: 'EX-IND-5', name: "Đỗ Thị E", email: "dothie@example.com", 
      examTypes: ["Ngoại ngữ"], paymentStatus: "Chưa thanh toán" },
    { examId: 'EX-IND-6', name: "Hoàng Văn F", email: "hoangf@example.com", 
      examTypes: ["Tin học","Ngoại ngữ"], paymentStatus: "Đã thanh toán" },
  ];

  // Thí sinh nhóm
  const groupRegistrations = [
    {
      groupName: "Trường THPT Ngô A",
      examTypes: ["Tin học","Ngoại ngữ"], paymentStatus: "Đã thanh toán",
      members: [
        { examId: 'EX-GRP1-1', name: "Nguyễn Văn X", email: "nguyenx@example.com" },
        { examId: 'EX-GRP1-2', name: "Trần Thị Y", email: "trany@example.com" },
        { examId: 'EX-GRP1-3', name: "Lý Văn Z",   email: "lyz@example.com" },
      ],
    },
    {
      groupName: "Trung tâm Anh ngữ Wise English",
      examTypes: ["Ngoại ngữ"], paymentStatus: "Chưa thanh toán",
      members: [
        { examId: 'EX-GRP2-1', name: "Lê Văn Z",   email: "lez@example.com" },
        { examId: 'EX-GRP2-2', name: "Phạm Thị W",  email: "phamw@example.com" },
        { examId: 'EX-GRP2-3', name: "Ngô Văn Q",   email: "ngoq@example.com" },
        { examId: 'EX-GRP2-4', name: "Dương Thị P", email: "duongp@example.com" },
      ],
    },
    {
      groupName: "Trung tâm Tin học ĐH KHTN",
      examTypes: ["Tin học"], paymentStatus: "Đã thanh toán",
      members: [
        { examId: 'EX-GRP3-1', name: "Bùi Văn H",  email: "buih@example.com" },
        { examId: 'EX-GRP3-2', name: "Đinh Thị J",  email: "dinhj@example.com" },
        { examId: 'EX-GRP3-3', name: "Trương Văn K", email: "truongk@example.com" },
      ],
    },
  ];

  // ==== GỘP DỮ LIỆU && LỌC CHƯA THANH TOÁN ====
  const allCandidates = [
    // cá nhân
    ...individualRegistrations.map((c) => ({
      ...c,
      unitName: "",
    })),
    // nhóm (mỗi member inherit examTypes, paymentStatus, unitName)
    ...groupRegistrations.flatMap((group) =>
      group.members.map((m) => ({
        examId: m.examId,
        name: m.name,
        email: m.email,
        examTypes: group.examTypes,
        paymentStatus: group.paymentStatus,
        unitName: group.groupName,
      }))
    ),
  ];

  const unpaidCandidates = allCandidates
    .filter((c) => c.paymentStatus === "Chưa thanh toán")
    .filter((c) =>
      searchTerm
        ? c.examId.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  // ==== HANDLERS ====
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handlePayment = (candidate) =>
    navigate('/payment-method', { state: { candidate } });

  // ==== RENDER ====
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Danh sách thí sinh chưa thanh toán
      </h2>

      {/* Search */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Tìm theo mã phiếu dự thi
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="VD: EX-IND-1 hoặc EX-GRP2-3"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Mã phiếu dự thi
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Tên
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Đơn vị
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Môn thi
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Thanh toán
              </th>
            </tr>
          </thead>
          <tbody>
            {unpaidCandidates.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-600">
                  Không tìm thấy thí sinh chưa thanh toán.
                </td>
              </tr>
            ) : (
              unpaidCandidates.map((c) => (
                <tr key={c.examId} className="border-b">
                  <td className="px-4 py-2 text-gray-600">{c.examId}</td>
                  <td className="px-4 py-2 text-gray-600">{c.name}</td>
                  <td className="px-4 py-2 text-gray-600">{c.email}</td>
                  <td className="px-4 py-2 text-gray-600">{c.unitName}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {Array.isArray(c.examTypes) ? c.examTypes.join(', ') : c.examType}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePayment(c)}
                      className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                      Thanh toán
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
