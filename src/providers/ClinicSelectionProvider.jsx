import { useState } from 'react';
import { ClinicSelectionContext } from '../context/ClinicSelectionContext.js';

export default function ClinicSelectionProvider({ items, children }) {
    const [selectedId, setSelectedId] = useState(null);
    const selectedClinic = items.find((c) => c.id === selectedId);

    function selectClinic(id) {
        if (items.some((c) => c.id === id)) setSelectedId(id);
    }

    function clearSelection() {
        setSelectedId(null);
    }

    return (
        <ClinicSelectionContext.Provider value={{ selectedId, selectedClinic, selectClinic, clearSelection }}>
            {children}
        </ClinicSelectionContext.Provider>
    );
}