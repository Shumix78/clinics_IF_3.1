import useAppointments from './useAppointments.js';

export default function useDeleteAppointment(items) {
    const { deleteAppointment } = useAppointments();

    return function deleteWithConfirmation(appointment) {
        const clinic = items.find((c) => c.id === appointment.clinicId);
        const name = clinic?.name ?? appointment.clinicId;

        const confirmed = window.confirm(
            `Видалити запис ${appointment.id} до закладу «${name}»?\nЗапис буде вилучено з поточної колекції.`
        );

        if (!confirmed) return { ok: false, cancelled: true };
        return deleteAppointment(appointment.id);
    };
}