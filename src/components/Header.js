import { FaChevronLeft, FaBars } from "react-icons/fa";

function Header({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="flex items-center justify-between p-4 bg-black shadow-md">
      <button
        onClick={onToggleSidebar}
        className="text-xl text-white p-2 border border-white rounded-md transition-all duration-300 hover:bg-white hover:text-black hover:border-black"
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
      </button>
      <h1 className="text-lg font-semibold text-white">
        TRUNG TÂM ANH NGỮ VÀ TIN HỌC ACCI
      </h1>
    </header>
  );
}

export default Header;
