export default function ClinicStatusBadge({ isOpenToday }) {
    const label = isOpenToday ? 'Працює чергове відділення' : 'Тільки за попереднім записом';
    const className = isOpenToday ? 'status status-open' : 'status status-closed';

    return <span className={className}>{label}</span>;
}