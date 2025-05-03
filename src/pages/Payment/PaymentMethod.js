import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentMethod = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const candidate = state?.candidate || {};
    const [selectedMethod, setSelectedMethod] = useState('');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
        bankAccount: '',
        transactionCode: '',
        walletProvider: '',
    });
    const [error, setError] = useState('');

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
        setError('');
        setFormData({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardHolder: '',
            bankAccount: '',
            transactionCode: '',
            walletProvider: '',
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === 'cardNumber' || id === 'bankAccount') {
            if (!/^\d*$/.test(value)) return;
        }

        if (id === 'cardHolder') {
            if (!/^[A-Za-z\s]*$/.test(value)) return;
        }


        if (id === 'expiryDate') {
            let formatted = value.replace(/[^0-9]/g, '');
            if (formatted.length > 2) {
                formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
            }
            setFormData({ ...formData, [id]: formatted });
            return;
        }

        setFormData({ ...formData, [id]: value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let qrCode = '';

        if (!selectedMethod) {
            setError('Vui lòng chọn phương thức thanh toán!');
            return;
        }

        if (selectedMethod === 'card') {
            const { cardNumber, expiryDate, cardHolder } = formData;
            if (!cardNumber || cardNumber.length < 16) {
                setError('Số thẻ phải có ít nhất 16 chữ số!');
                return;
            }
            if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
                setError('Ngày hết hạn không hợp lệ (MM/YY)!');
                return;
            }
            const [month, year] = expiryDate.split('/').map(Number);
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            if (
                year < currentYear ||
                (year === currentYear && month < currentMonth)
            ) {
                setError('Thẻ đã hết hạn!');
                return;
            }
            if (!cardHolder || !/^[A-Za-z\s]+$/.test(cardHolder)) {
                setError('Tên chủ thẻ chỉ được chứa chữ cái và khoảng trắng!');
                return;
            }
            qrCode = 'jpg/qr_payment.jpg';
        } else if (selectedMethod === 'bank') {
            const { bankAccount, cardHolder } = formData;
            if (!bankAccount || bankAccount.length < 10) {
                setError('Số tài khoản phải có ít nhất 10 chữ số!');
                return;
            }
            if (!cardHolder || !/^[A-Za-z\s]+$/.test(cardHolder)) {
                setError('Tên chủ tài khoản chỉ được chứa chữ cái và khoảng trắng!');
                return;
            }
            qrCode = 'jpg/qr_payment.jpg';
        } else if (selectedMethod === 'wallet') {
            const { walletProvider } = formData;
            if (!walletProvider) {
                setError('Vui lòng chọn một ví điện tử!');
                return;
            }
            qrCode = 'jpg/qr_payment.jpg';
        }

        navigate('/payment-qr', { state: { candidate, qrCode, formData } });
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Chọn Phương Thức Thanh Toán</h2>

            <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Thông Tin Thí Sinh</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <p><strong>Mã phiếu dự thi:</strong> {candidate.examId || 'N/A'}</p>
                    <p><strong>Họ tên:</strong> {candidate.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
                    <p><strong>Số điện thoại:</strong> {candidate.phone || 'N/A'}</p>
                    <p><strong>Môn thi:</strong> {candidate.examType || 'N/A'}</p>
                    <p><strong>Số tiền:</strong> 100,000 VNĐ</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={selectedMethod === 'card'}
                            onChange={() => handleMethodChange('card')}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg font-medium text-gray-700">Thẻ Ngân Hàng</span>
                    </label>
                    {selectedMethod === 'card' && (
                        <div className="space-y-4 pl-8 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Số Thẻ
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="16"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày Hết Hạn (MM/YY)
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên Chủ Thẻ
                                </label>
                                <input
                                    type="text"
                                    id="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    placeholder="NGUYEN VAN A"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={selectedMethod === 'bank'}
                            onChange={() => handleMethodChange('bank')}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg font-medium text-gray-700">Chuyển Khoản Ngân Hàng</span>
                    </label>
                    {selectedMethod === 'bank' && (
                        <div className="space-y-4 pl-8 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Số Tài Khoản
                                </label>
                                <input
                                    type="text"
                                    id="bankAccount"
                                    value={formData.bankAccount}
                                    onChange={handleInputChange}
                                    placeholder="1234567890"
                                    maxLength="10"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên Chủ Tài Khoản
                                </label>
                                <input
                                    type="text"
                                    id="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    placeholder="NGUYEN VAN A"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="wallet"
                            checked={selectedMethod === 'wallet'}
                            onChange={() => handleMethodChange('wallet')}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-lg font-medium text-gray-700">Ví Điện Tử</span>
                    </label>
                    {selectedMethod === 'wallet' && (
                        <div className="space-y-4 pl-8 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label htmlFor="walletProvider" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nhà Cung Cấp Ví
                                </label>
                                <select
                                    id="walletProvider"
                                    value={formData.walletProvider}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Chọn ví</option>
                                    <option value="momo">Momo</option>
                                    <option value="zalopay">ZaloPay</option>
                                    <option value="viettelmoney">Viettel Money</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-center space-x-6 mt-8">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Tiếp Tục
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/payment')}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;