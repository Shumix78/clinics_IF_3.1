import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import AppButton from '../components/ui/AppButton.jsx';
import AppointmentFilters from '../components/appointments/AppointmentFilters.jsx';
import AppointmentTable from '../components/appointments/AppointmentTable.jsx';
import useAppointments from '../hooks/useAppointments.js';
import useAppointmentFilters from '../hooks/useAppointmentFilters.js';
import useDeleteAppointment from '../hooks/useDeleteAppointment.js';

export default function AppointmentsPage({ items }) {
    const { appointments } = useAppointments();
    const filters = useAppointmentFilters(appointments, items);
    const deleteWithConfirmation = useDeleteAppointment(items);
    const [error, setError] = useState('');

    function handleDelete(app) {
        setError('');
        const result = deleteWithConfirmation(app);
        if (!result.ok && !result.cancelled) setError(result.message);
    }

    return (
        <>
            <PageHeading title="Записи на прийом" />
            <p><Link to="/appointments/new">Створити новий запис</Link></p>

            <AppointmentFilters
                query={filters.query}
                decl={filters.decl}
                sort={filters.sort}
                onQueryChange={filters.setQuery}
                onDeclChange={filters.setDecl}
                onSortChange={filters.setSort}
                onReset={filters.resetFilters}
            />

            <p>Показано: {filters.visibleAppointments.length} із {appointments.length}</p>
            {error && <p role="alert" className="field-error">{error}</p>}

            {appointments.length === 0 ? (
                <EmptyState title="Записів ще немає">
                    <p><Link to="/clinics">Виберіть поліклініку в каталозі для запису</Link></p>
                </EmptyState>
            ) : filters.visibleAppointments.length === 0 ? (
                <EmptyState title="За цими умовами нічого не знайдено">
                    <AppButton variant="secondary" onClick={filters.resetFilters}>
                        Скинути умови фільтрування
                    </AppButton>
                </EmptyState>
            ) : (
                <AppointmentTable
                    appointments={filters.visibleAppointments}
                    items={items}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}