import useAppointments from '../../hooks/useAppointments.js';
import AppButton from '../ui/AppButton.jsx';

export default function AppointmentNotice() {
    const { notice, dismissNotice } = useAppointments();

    return (
        <div className="operation-notice">
            <p role="status">{notice}</p>
            {notice && (
                <AppButton variant="secondary" onClick={dismissNotice}>
                    Закрити повідомлення
                </AppButton>
            )}
        </div>
    );
}