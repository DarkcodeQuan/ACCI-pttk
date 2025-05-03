export default function SuccessModal({ show, onClose, candidateName, selectedExams, isGroup }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow w-full max-w-md">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Gửi thành công!</h2>
          {isGroup ? (
            <p>Đơn vị <strong>{candidateName}</strong> đã gửi đăng ký. Nhân viên sẽ liên hệ trong thời gian sớm nhất.</p>
          ) : (
            <>
              <p>Thí sinh <strong>{candidateName}</strong> đã đăng ký thành công!</p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {Object.entries(selectedExams).map(([exam, date]) => (
                  <li key={exam}>{exam}: {date}</li>
                ))}
              </ul>
            </>
          )}
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }
  