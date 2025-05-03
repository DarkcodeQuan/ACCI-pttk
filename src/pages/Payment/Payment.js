import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCandidates } from '../../context/CandidatesContext';

const UnpaidCandidates = () => {
    const navigate = useNavigate();
    const { candidates } = useCandidates();
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc danh sách theo mã phiếu dự thi và trạng thái chưa thanh toán
    const unpaidCandidates = candidates
        .filter((candidate) => !candidate.isPaid)
        .filter((candidate) =>
            searchTerm ? candidate.examId.toLowerCase().includes(searchTerm.toLowerCase()) : true
        );

    const handlePayment = (candidate) => {
        navigate('/payment-method', { state: { candidate } });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Danh sách thí sinh chưa thanh toán</h2>

            {/* Ô tìm kiếm */}
            <div className="mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Tìm kiếm theo mã phiếu dự thi
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Nhập mã phiếu dự thi (VD: EXAM001)"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Bảng danh sách */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mã phiếu dự thi</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tên</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SĐT</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Môn thi</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Thanh toán</th>
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
                            unpaidCandidates.map((candidate) => (
                                <tr key={candidate.id} className="border-b">
                                    <td className="px-4 py-2 text-sm text-gray-600">{candidate.examId}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{candidate.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{candidate.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{candidate.phone}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{candidate.examType}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handlePayment(candidate)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
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
};

export default UnpaidCandidates;