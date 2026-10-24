import { useSearchParams } from 'react-router-dom';

export default function useAppointmentFilters(appointments = [], items = []) {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('q') ?? '';
    const rawDecl = searchParams.get('decl');
    const decl = ['yes', 'no'].includes(rawDecl) ? rawDecl : 'all';

    const rawSort = searchParams.get('sort');
    const sort = ['duration-asc', 'duration-desc'].includes(rawSort) ? rawSort : 'clinic';

    // Безпечне читання навіть якщо items або appointments не передано
    const safeItems = Array.isArray(items) ? items : [];
    const safeAppointments = Array.isArray(appointments) ? appointments : [];

    const clinicNames = new Map(safeItems.map((i) => [i.id, i.name]));
    const normalizedQuery = query.trim().toLowerCase();

    const visibleAppointments = safeAppointments.filter((app) => {
        const text = `${clinicNames.get(app.clinicId) ?? ''} ${app.purpose}`.toLowerCase();
        const matchesDecl =
            decl === 'all' || (decl === 'yes' ? app.hasDeclaration : !app.hasDeclaration);
        return text.includes(normalizedQuery) && matchesDecl;
    });

    visibleAppointments.sort((a, b) => {
        if (sort === 'duration-asc') return a.durationHours - b.durationHours;
        if (sort === 'duration-desc') return b.durationHours - a.durationHours;
        const nameA = clinicNames.get(a.clinicId) ?? '';
        const nameB = clinicNames.get(b.clinicId) ?? '';
        return nameA.localeCompare(nameB, 'uk') || a.id.localeCompare(b.id);
    });

    function setParameter(name, value, defaultValue, replace = false) {
        const next = new URLSearchParams(searchParams);
        if (value === defaultValue) next.delete(name);
        else next.set(name, value);
        setSearchParams(next, { replace });
    }

    function resetFilters() {
        const next = new URLSearchParams(searchParams);
        next.delete('q');
        next.delete('decl');
        next.delete('sort');
        setSearchParams(next);
    }

    return {
        query,
        decl,
        sort,
        visibleAppointments,
        setQuery: (v) => setParameter('q', v, '', true),
        setDecl: (v) => setParameter('decl', v, 'all'),
        setSort: (v) => setParameter('sort', v, 'clinic'),
        resetFilters,
    };
}