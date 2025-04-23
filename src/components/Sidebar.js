import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/registration", label: "Đăng ký" },
    { path: "/payment", label: "Thanh toán" },
    { path: "/reschedule", label: "Gia hạn thi" },
    { path: "/certificates", label: "Chứng chỉ" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } bg-white shadow-md h-screen overflow-hidden transition-all duration-300`}
    >
      <div className="p-4 text-xl font-bold border-b">Menu</div>
      <nav className="p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-3 py-2 rounded-lg mb-2 ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
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
