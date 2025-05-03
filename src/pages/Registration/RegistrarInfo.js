export default function RegistrarInfo({ form, setForm }) {
    return (
      <div className="flex-1 border p-4 rounded bg-white shadow">
        <h3 className="font-semibold mb-2">Thông tin người đăng ký</h3>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Họ và tên người đăng ký"
          value={form.registrarName}
          onChange={(e) => setForm({ ...form, registrarName: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Số điện thoại người đăng ký"
          value={form.registrarPhone}
          onChange={(e) => setForm({ ...form, registrarPhone: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email người đăng ký"
          value={form.registrarEmail}
          onChange={(e) => setForm({ ...form, registrarEmail: e.target.value })}
        />
      </div>
    );
  }
  