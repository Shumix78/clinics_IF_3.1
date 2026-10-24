import ClinicCard from './ClinicCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function ClinicList({ items, selectedId, onSelect, emptyTitle = 'Закладів не знайдено' }) {
    if (items.length === 0) {
        return <EmptyState title={emptyTitle} />;
    }

    return (
        <ul className="clinic-grid">
            {items.map((item) => (
                <li key={item.id}>
                    <ClinicCard
                        item={item}
                        selected={item.id === selectedId}
                        onSelect={onSelect}
                    />
                </li>
            ))}
        </ul>
    );
}