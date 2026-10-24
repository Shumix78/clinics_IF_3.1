import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';
import AppButton from '../components/ui/AppButton.jsx';
import ClinicStatusBadge from '../components/clinics/ClinicStatusBadge.jsx';
import useClinicSelection from '../hooks/useClinicSelection.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function ClinicDetailsPage({ items }) {
    const { clinicId } = useParams();
    const navigate = useNavigate();
    const { selectClinic } = useClinicSelection();

    const item = items.find((c) => c.id === clinicId);
    if (!item) {
        return (
            <NotFoundPage
                title="Поліклініку не знайдено"
                message="У базі міста немає закладу з таким ідентифікатором."
            />
        );
    }

    function handlePrepareAppointment() {
        selectClinic(item.id);
        navigate(`/appointments/new?${new URLSearchParams({ clinicId: item.id })}`);
    }

    return (
        <>
            <PageHeading title={item.name} />
            <p><strong>Адреса:</strong> {item.address}</p>
            <p><strong>Телефон:</strong> {item.phone}</p>
            <p>{item.description}</p>
            <p><ClinicStatusBadge isOpenToday={item.isOpenToday} /></p>

            <AppButton onClick={handlePrepareAppointment}>
                Обрати заклад та перейти до запису
            </AppButton>
            <p><Link to="/clinics">До каталогу без фільтрів</Link></p>
        </>
    );
}