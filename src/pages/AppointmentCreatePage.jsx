import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import useClinicSelection from '../hooks/useClinicSelection.js';
import useAppointments from '../hooks/useAppointments.js';
import AppointmentPage from './AppointmentPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function AppointmentCreatePage({ items }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { selectedId, clearSelection } = useClinicSelection();
    const { createAppointment } = useAppointments();

    const clinicId = searchParams.get('clinicId');

    if (clinicId === null) {
        const lastSearch = selectedId ? `?${new URLSearchParams({ clinicId: selectedId })}` : null;
        return (
            <>
                <PageHeading title="Новий запис" />
                <EmptyState title="Спочатку виберіть поліклініку">
                    <p><Link to="/clinics">Перейти до каталогу</Link></p>
                    {lastSearch && (
                        <p><Link to={lastSearch}>Використати останній обраний заклад</Link></p>
                    )}
                </EmptyState>
            </>
        );
    }

    const item = items.find((c) => c.id === clinicId);
    if (!item) {
        return <NotFoundPage title="Заклад не знайдено" message="Поліклініка відсутня в базі." />;
    }

    function handleSave(input) {
        const result = createAppointment(input);
        if (result.ok) {
            navigate(`/appointments/${encodeURIComponent(result.record.id)}`, { replace: true });
        }
        return result;
    }

    function handleCancel() {
        clearSelection();
        navigate('/clinics', { replace: true });
    }

    return (
        <AppointmentPage
            key={`new-${item.id}`}
            title="Новий запис на прийом"
            item={item}
            onSave={handleSave}
            onCancel={handleCancel}
            submitLabel="Створити запис"
            cancelLabel="Скасувати чернетку та очистити вибір"
        />
    );
}