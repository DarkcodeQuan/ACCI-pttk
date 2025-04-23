import { FaChevronLeft, FaBars } from "react-icons/fa"; // Import biểu tượng hamburger

function Header({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <button onClick={onToggleSidebar} className="text-xl">
        {/* Dùng biểu tượng hamburger khi sidebar đóng và mũi tên khi sidebar mở */}
        {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
      </button>
      <h1 className="text-lg font-semibold">TRUNG TÂM ANH NGỮ VÀ TIN HỌC ACCI</h1>
    </header>
  );
}

export default Header;