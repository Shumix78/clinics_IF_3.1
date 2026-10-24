import { useNavigate, useParams } from 'react-router-dom';
import useAppointments from '../hooks/useAppointments.js';
import AppointmentPage from './AppointmentPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function AppointmentEditPage({ items }) {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { appointments, updateAppointment } = useAppointments();

    const appointment = appointments.find((a) => a.id === appointmentId);
    if (!appointment) return <NotFoundPage title="Запис для редагування не знайдено" />;

    const item = items.find((c) => c.id === appointment.clinicId);
    if (!item) return <NotFoundPage title="Заклад запису відсутній" />;

    function handleSave(input) {
        const result = updateAppointment(appointment.id, input);
        if (result.ok) {
            navigate(`/appointments/${encodeURIComponent(result.record.id)}`, { replace: true });
        }
        return result;
    }

    return (
        <AppointmentPage
            key={`edit-${appointment.id}`}
            title={`Редагування запису ${appointment.id}`}
            item={item}
            initialDraft={{
                purpose: appointment.purpose,
                durationHours: appointment.durationHours,
                hasDeclaration: appointment.hasDeclaration,
            }}
            onSave={handleSave}
            submitLabel="Зберегти зміни"
            onCancel={() => navigate(`/appointments/${encodeURIComponent(appointment.id)}`)}
        />
    );
}