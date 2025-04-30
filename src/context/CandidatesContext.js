import React, { createContext, useContext, useState } from 'react';

const CandidatesContext = createContext();

export const CandidatesProvider = ({ children }) => {
    const [candidates, setCandidates] = useState([
        {
            id: 1,
            examId: 'EXAM001',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phone: '0901234567',
            examType: 'Tin học',
            isPaid: false,
        },
        {
            id: 2,
            examId: 'EXAM002',
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            phone: '0912345678',
            examType: 'Ngoại ngữ',
            isPaid: false,
        },
        {
            id: 3,
            examId: 'EXAM003',
            name: 'Lê Văn Z',
            email: 'lez@example.com',
            phone: '0901239873',
            examType: 'Ngoại ngữ',
            isPaid: false,
        },
        {
            id: 4,
            examId: 'EXAM004',
            name: 'Phạm Thị W',
            email: 'phamw@example.com',
            phone: '0912345378',
            examType: 'Ngoại ngữ',
            isPaid: false,
        },
    ]);

    return (
        <CandidatesContext.Provider value={{ candidates, setCandidates }}>
            {children}
        </CandidatesContext.Provider>
    );
};

export const useCandidates = () => useContext(CandidatesContext);