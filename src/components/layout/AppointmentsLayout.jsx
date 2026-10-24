import { NavLink, Outlet } from 'react-router-dom';
import AppointmentNotice from '../appointments/AppointmentNotice.jsx';

export default function AppointmentsLayout() {
    return (
        <>
            <nav aria-label="Навігація розділом записів">
                <ul className="nav-list">
                    <li><NavLink to="." end className="nav-link">Список записів</NavLink></li>
                    <li><NavLink to="new" className="nav-link">Новий запис</NavLink></li>
                </ul>
            </nav>
            <p className="field-hint">Локальні дані зберігаються до перезавантаження сторінки.</p>
            <AppointmentNotice />
            <Outlet />
        </>
    );
}