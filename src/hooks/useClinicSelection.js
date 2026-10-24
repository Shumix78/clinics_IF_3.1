import { useContext } from 'react';
import { ClinicSelectionContext } from '../context/ClinicSelectionContext.js';

export default function useClinicSelection() {
    const context = useContext(ClinicSelectionContext);
    if (!context) throw new Error('useClinicSelection must be used within ClinicSelectionProvider');
    return context;
}