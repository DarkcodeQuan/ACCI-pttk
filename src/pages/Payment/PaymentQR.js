import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCandidates } from '../../context/CandidatesContext';
import SuccessMessage from '../../components/SuccessMessage';

const PaymentQR = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const candidate = state?.candidate || {};
    const qrCode = state?.qrCode || '';
    const { candidates, setCandidates } = useCandidates();
    const [isPaid, setIsPaid] = useState(() => {
        const currentCandidate = candidates.find(c => c.id === candidate.id);
        return currentCandidate ? currentCandidate.isPaid : false;
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Hàm che số tài khoản, chỉ hiển thị 4 số cuối
    const maskAccountNumber = (accountNumber) => {
        if (!accountNumber) return 'N/A';
        const lastFourDigits = accountNumber.slice(-4);
        const maskedPart = '*'.repeat(accountNumber.length - 4);
        return `${maskedPart}${lastFourDigits}`;
    };

    const handleConfirmPayment = () => {
        // Cập nhật isPaid trong danh sách candidates
        setCandidates((prevCandidates) =>
            prevCandidates.map((c) =>
                c.id === candidate.id ? { ...c, isPaid: true } : c
            )
        );

        // Cập nhật trạng thái giao diện
        setIsPaid(true);

        // Hiển thị thông báo thành công
        setShowSuccessMessage(true);
    };

    // Điều hướng về danh sách sau khi thông báo thành công được đóng
    const handleMessageClose = () => {
        setShowSuccessMessage(false);
        navigate('/payment');
    };

    if (!state) {
        return (
            <div className="max-w-md mx-auto p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Quét mã QR để thanh toán</h2>
                <p className="text-center text-gray-600 mb-4">Không có thông tin thanh toán!</p>
                <div className="text-center">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => navigate('/payment')}
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    const accountNumber = '1234567890'; // Số tài khoản cố định

    return (
        <div className="relative">
            {showSuccessMessage && (
                <SuccessMessage
                    message={`Thanh toán thành công cho ${candidate.name} (Mã phiếu: ${candidate.examId})!`}
                    onClose={handleMessageClose}
                />
            )}
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Quét Mã QR Để Thanh Toán</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Thông Tin Thanh Toán</h3>
                        <div className="space-y-4 text-gray-600 text-lg">
                            <p><strong>Mã phiếu dự thi:</strong> {candidate.examId || 'N/A'}</p>
                            <p><strong>Họ tên:</strong> {candidate.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
                            <p><strong>Môn thi:</strong> {candidate.examType || 'N/A'}</p>
                            <p><strong>Số tiền:</strong> 100,000 VNĐ</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        {qrCode ? (
                            <img
                                src={qrCode}
                                alt="QR Code"
                                className="mb-6 w-52 h-52"
                                onError={() => console.log('Error loading QR code image at:', qrCode)}
                            />
                        ) : (
                            <p className="text-red-600 mb-6">Không tìm thấy mã QR!</p>
                        )}
                        <div className="text-center text-gray-600">
                            <p><strong>Người nhận:</strong> Trung tâm Anh ngữ và Tin học ACCI</p>
                            <p><strong>Số tài khoản:</strong> {maskAccountNumber(accountNumber)}</p>
                            <p><strong>Ngân hàng:</strong> Vietcombank</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-6 mt-10">
                    <button
                        onClick={handleConfirmPayment}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                        disabled={isPaid}
                    >
                        {isPaid ? 'Đã Thanh Toán' : 'Xác Nhận Thanh Toán'}
                    </button>
                    {!isPaid && (
                        <button
                            onClick={() => navigate('/payment-method', { state: { candidate } })}
                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                        >
                            Chọn Lại Phương Thức Thanh Toán
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentQR;