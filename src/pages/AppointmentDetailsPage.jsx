import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';
import AppButton from '../components/ui/AppButton.jsx';
import useAppointments from '../hooks/useAppointments.js';
import useDeleteAppointment from '../hooks/useDeleteAppointment.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function AppointmentDetailsPage({ items }) {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { appointments } = useAppointments();
    const deleteWithConfirmation = useDeleteAppointment(items);
    const [error, setError] = useState('');

    const appointment = appointments.find((a) => a.id === appointmentId);
    if (!appointment) return <NotFoundPage title="Запис не знайдено" />;

    const clinic = items.find((c) => c.id === appointment.clinicId);

    function handleDelete() {
        setError('');
        const result = deleteWithConfirmation(appointment);
        if (result.ok) {
            navigate('/appointments', { replace: true });
        } else if (!result.cancelled) {
            setError(result.message);
        }
    }

    return (
        <>
            <PageHeading title={`Запис ${appointment.id}`} />
            {error && <p role="alert" className="field-error">{error}</p>}
            <dl>
                <dt>Поліклініка</dt>
                <dd>{clinic?.name ?? 'Заклад відсутній у каталозі'}</dd>
                <dt>Причина звернення</dt>
                <dd>{appointment.purpose}</dd>
                <dt>Тривалість</dt>
                <dd>{appointment.durationHours} год</dd>
                <dt>Декларація</dt>
                <dd>{appointment.hasDeclaration ? 'Підписана' : 'Відсутня'}</dd>
            </dl>
            <p>
                <Link to={`/appointments/${encodeURIComponent(appointment.id)}/edit`}>
                    Редагувати запис
                </Link>
            </p>
            <AppButton variant="secondary" onClick={handleDelete}>
                Видалити запис
            </AppButton>
            <p><Link to="/appointments">До всіх записів</Link></p>
        </>
    );
}