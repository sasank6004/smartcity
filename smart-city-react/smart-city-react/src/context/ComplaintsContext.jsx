/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';

const ComplaintsContext = createContext();

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    try {
      const raw = localStorage.getItem('complaints');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to read complaints from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('complaints', JSON.stringify(complaints));
    } catch (e) {
      console.error('Failed to write complaints to localStorage', e);
    }
  }, [complaints]);

  const addComplaint = (complaint) => {
    const id = `C-${Date.now()}`;
    const newComplaint = {
      id,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...complaint,
    };
    setComplaints(prev => [newComplaint, ...prev]);
    return newComplaint;
  };

  const updateComplaintStatus = (id, status) => {
    setComplaints(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <ComplaintsContext.Provider value={{ complaints, addComplaint, updateComplaintStatus }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintsContext);

export default ComplaintsContext;
