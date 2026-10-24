import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import AppointmentsLayout from './components/layout/AppointmentsLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ClinicListPage from './pages/ClinicListPage.jsx';
import ClinicDetailsPage from './pages/ClinicDetailsPage.jsx';
import AppointmentsPage from './pages/AppointmentsPage.jsx';
import AppointmentCreatePage from './pages/AppointmentCreatePage.jsx';
import AppointmentDetailsPage from './pages/AppointmentDetailsPage.jsx';
import AppointmentEditPage from './pages/AppointmentEditPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import useClinicSelection from './hooks/useClinicSelection.js';
import { clinics } from './data/clinics.js';

function CatalogRouteWrapper() {
    const { selectedId, selectClinic } = useClinicSelection();
    return (
        <ClinicListPage
            items={clinics}
            selectedId={selectedId}
            onSelect={selectClinic}
        />
    );
}

export default function App() {
    return (
        <Routes>
            <Route element={<AppLayout items={clinics} />}>
                <Route index element={<HomePage />} />

                <Route path="clinics">
                    <Route index element={<CatalogRouteWrapper />} />
                    <Route path=":clinicId" element={<ClinicDetailsPage items={clinics} />} />
                </Route>

                <Route path="appointments" element={<AppointmentsLayout />}>
                    <Route index element={<AppointmentsPage items={clinics} />} />
                    <Route path="new" element={<AppointmentCreatePage items={clinics} />} />
                    <Route path=":appointmentId" element={<AppointmentDetailsPage items={clinics} />} />
                    <Route path=":appointmentId/edit" element={<AppointmentEditPage items={clinics} />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}