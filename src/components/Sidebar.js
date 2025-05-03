import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Danh sách đăng ký" },
    { path: "/registration", label: "Đăng ký" },
    { path: "/payment", label: "Thanh toán" },
    { path: "/reschedule", label: "Gia hạn thi" },
    { path: "/certificates", label: "Chứng chỉ" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } bg-gray-800 shadow-md h-screen overflow-hidden transition-all duration-300`}
    >
      <div className="p-4 text-xl font-bold border-b border-white text-white">
        Menu
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-3 py-2 rounded-lg mb-2 ${
              location.pathname === item.path
                ? "bg-white text-black font-bold"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
