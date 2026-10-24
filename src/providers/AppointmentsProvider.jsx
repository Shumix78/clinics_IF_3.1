import { useState } from 'react';
import { AppointmentsContext } from '../context/AppointmentsContext.js';
import { appointments as initialAppointments } from '../data/appointments.js';
import { validateAppointment } from '../domain/appointmentValidation.js';

export default function AppointmentsProvider({ items, children }) {
    const [appointmentsList, setAppointmentsList] = useState(() => (
        initialAppointments.map((app) => ({ ...app }))
    ));
    const [notice, setNotice] = useState('');

    function createAppointment(input) {
        const validation = validateAppointment(input, items);
        if (!validation.ok) return validation;

        const record = {
            ...validation.value,
            id: `app-${crypto.randomUUID().slice(0, 8)}`,
        };

        setAppointmentsList((prev) => [...prev, record]);
        setNotice('Запис успішно створено в локальній колекції.');
        return { ok: true, record };
    }

    function updateAppointment(id, input) {
        const current = appointmentsList.find((app) => app.id === id);
        if (!current) return { ok: false, message: 'Запис для оновлення не знайдено.' };

        const validation = validateAppointment(input, items);
        if (!validation.ok) return validation;

        const record = { ...validation.value, id: current.id };
        setAppointmentsList((prev) => prev.map((app) => (app.id === id ? record : app)));
        setNotice('Зміни запису збережено в локальній колекції.');
        return { ok: true, record };
    }

    function deleteAppointment(id) {
        if (!appointmentsList.some((app) => app.id === id)) {
            return { ok: false, message: 'Запис для видалення не знайдено.' };
        }
        setAppointmentsList((prev) => prev.filter((app) => app.id !== id));
        setNotice('Запис видалено з локальної колекції.');
        return { ok: true };
    }

    function dismissNotice() {
        setNotice('');
    }

    return (
        <AppointmentsContext.Provider
            value={{
                appointments: appointmentsList,
                createAppointment,
                updateAppointment,
                deleteAppointment,
                notice,
                dismissNotice,
            }}
        >
            {children}
        </AppointmentsContext.Provider>
    );
}