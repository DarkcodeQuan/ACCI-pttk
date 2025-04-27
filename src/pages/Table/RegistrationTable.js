export default function RegistrationTable({ data = [] }) {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Registered List</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Exam Type</th>
            <th className="border p-2">Exam Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="border p-2 text-center" colSpan={5}>Chưa có đăng ký nào</td>
            </tr>
          ) : (
            data.map((entry, index) => (
              <tr key={index}>
                <td className="border p-2">{entry.name}</td>
                <td className="border p-2">{entry.email}</td>
                <td className="border p-2">{entry.phone}</td>
                <td className="border p-2">{entry.examType}</td>
                <td className="border p-2">{entry.examDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
