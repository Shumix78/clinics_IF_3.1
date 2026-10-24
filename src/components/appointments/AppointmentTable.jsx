import { Link } from 'react-router-dom';
import AppButton from '../ui/AppButton.jsx';

export default function AppointmentTable({ appointments = [], items = [], onDelete }) {
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <div className="table-scroll">
            <table className="requests-table">
                <caption>Записи поточної колекції</caption>
                <thead>
                <tr>
                    <th scope="col">Поліклініка та причина</th>
                    <th scope="col">Тривалість</th>
                    <th scope="col">Декларація</th>
                    <th scope="col">Дії</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((app) => {
                    const clinic = safeItems.find((c) => c.id === app.clinicId);
                    const path = `/appointments/${encodeURIComponent(app.id)}`;
                    return (
                        <tr key={app.id}>
                            <td>
                                <strong>{clinic?.name ?? 'Заклад відсутній'}</strong>
                                <p>{app.purpose}</p>
                            </td>
                            <td>{app.durationHours} год</td>
                            <td>{app.hasDeclaration ? 'Так' : 'Ні'}</td>
                            <td>
                                <p><Link to={path}>Переглянути</Link></p>
                                <p><Link to={`${path}/edit`}>Редагувати</Link></p>
                                <AppButton variant="secondary" onClick={() => onDelete(app)}>
                                    Видалити
                                </AppButton>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}