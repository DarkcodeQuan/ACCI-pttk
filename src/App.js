import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Table/Dashboard";
import Registration from "./pages/Registration/Registration";
import { CandidatesProvider } from './context/CandidatesContext';
import Payment from "./pages/Payment/Payment";
import PaymentQR from "./pages/Payment/PaymentQR";
import PaymentMethod from "./pages/Payment/PaymentMethod";
import Reschedule from "./pages/Reschedule";
import Certificates from "./pages/Certificates";
import NotFound from "./pages/NotFound";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <CandidatesProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar isOpen={isSidebarOpen} />
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <main className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/payment-qr" element={<PaymentQR />} />
                <Route path="/reschedule" element={<Reschedule />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </CandidatesProvider>
  );
}

export default App;