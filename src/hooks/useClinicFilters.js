import { useSearchParams } from 'react-router-dom';

export default function useClinicFilters(items) {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('q') ?? '';
    const openOnly = searchParams.get('open') === '1';

    const normalized = query.trim().toLowerCase();
    const visibleItems = items.filter((item) => (
        item.name.toLowerCase().includes(normalized) && (!openOnly || item.isOpenToday)
    ));

    function setQuery(value) {
        const next = new URLSearchParams(searchParams);
        if (value === '') {
            next.delete('q');
        } else {
            next.set('q', value);
        }
        setSearchParams(next, { replace: true });
    }

    function setOpenOnly(value) {
        const next = new URLSearchParams(searchParams);
        if (value) {
            next.set('open', '1');
        } else {
            next.delete('open');
        }
        setSearchParams(next);
    }

    function resetFilters() {
        const next = new URLSearchParams(searchParams);
        next.delete('q');
        next.delete('open');
        setSearchParams(next);
    }

    return { query, setQuery, openOnly, setOpenOnly, visibleItems, resetFilters };
}