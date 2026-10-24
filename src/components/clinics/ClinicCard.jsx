import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClinicStatusBadge from './ClinicStatusBadge.jsx';
import AppButton from '../ui/AppButton.jsx';

export default function ClinicCard({ item, selected, onSelect }) {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const detailsId = `clinic-${item.id}-details`;

    return (
        <article className="clinic-card">
            <h3>
                <Link to={`/clinics/${encodeURIComponent(item.id)}`}>
                    {item.name}
                </Link>
            </h3>
            <p><strong>Адреса:</strong> {item.address}</p>
            <p><strong>Тел.:</strong> {item.phone}</p>
            <p><ClinicStatusBadge isOpenToday={item.isOpenToday} /></p>

            <AppButton
                variant="secondary"
                aria-expanded={detailsOpen}
                aria-controls={detailsId}
                onClick={() => setDetailsOpen((prev) => !prev)}
            >
                {detailsOpen ? 'Згорнути' : 'Детальніше'}
            </AppButton>

            <p id={detailsId} hidden={!detailsOpen}>{item.description}</p>

            <p>
                <AppButton
                    aria-pressed={selected}
                    onClick={() => onSelect(item.id)}
                >
                    {selected ? '✓ Обрано' : `Обрати «${item.name}»`}
                </AppButton>
            </p>
        </article>
    );
}