import { useContext } from 'react';
import { AppointmentsContext } from '../context/AppointmentsContext.js';

export default function useAppointments() {
    const context = useContext(AppointmentsContext);
    if (context === null) {
        throw new Error('useAppointments must be used within AppointmentsProvider');
    }
    return context;
}