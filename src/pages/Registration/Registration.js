import { useState } from "react";
import GroupForm from "./GroupForm";
import IndividualForm from "./IndividualForm";
//import RegistrationTable from "../Table/RegistrationTable";

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [mode, setMode] = useState("individual");

  const handleGroupSubmit = (form) => {
    const participantsWithGroupInfo = form.participants.map((p) => ({
      name: p.name,
      email: p.email,
      phone: p.phone,
      examType: form.examType,
      examDate: form.examDate,
    }));

    setRegistrations((prev) => [...prev, ...participantsWithGroupInfo]);
  };

  const handleIndividualSubmit = (form) => {
    const participant = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      examType: form.examType,
      examDate: form.examDate,
    };

    setRegistrations((prev) => [...prev, participant]);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${mode === "individual" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("individual")}
        >
          Đăng ký cá nhân
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "group" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("group")}
        >
          Đăng ký nhóm
        </button>
      </div>

      {mode === "individual" ? (
        <IndividualForm onSubmit={handleIndividualSubmit} />
      ) : (
        <GroupForm onSubmit={handleGroupSubmit} />
      )}
    </div>
  );
}
