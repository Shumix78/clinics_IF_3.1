import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import ClinicSelectionProvider from '../../providers/ClinicSelectionProvider.jsx';
import AppointmentsProvider from '../../providers/AppointmentsProvider.jsx';

const navigationLinks = [
    { to: '/', label: 'Головна', end: true },
    { to: '/clinics', label: 'Поліклініки' },
    { to: '/appointments', label: 'Записи' },
];

export default function AppLayout({ items }) {
    return (
        <>
            <a className="skip-link" href="#main-content">Перейти до вмісту</a>
            <SiteHeader title="Поліклініки Франківська" links={navigationLinks} />
            <main id="main-content" tabIndex={-1}>
                <ClinicSelectionProvider items={items}>
                    <AppointmentsProvider items={items}>
                        <Outlet />
                    </AppointmentsProvider>
                </ClinicSelectionProvider>
            </main>
            <footer>Муніципальний медичний портал Івано-Франківська © 2026</footer>
        </>
    );
}