import { Link } from 'react-router-dom';
import PageHeading from '../components/ui/PageHeading.jsx';
import Section from '../components/ui/Section.jsx';
import ClinicSummary from '../components/clinics/ClinicSummary.jsx';
import ClinicFilters from '../components/clinics/ClinicFilters.jsx';
import ClinicList from '../components/clinics/ClinicList.jsx';
import useClinicFilters from '../hooks/useClinicFilters.js';

export default function ClinicListPage({ items, selectedId, onSelect }) {
    const { query, setQuery, openOnly, setOpenOnly, visibleItems, resetFilters } = useClinicFilters(items);
    const appointmentSearch = selectedId ? `?${new URLSearchParams({ clinicId: selectedId })}` : '';

    return (
        <>
            <PageHeading title="Каталог поліклінік" />
            <Section id="catalog" title="Пошук поліклініки">
                <ClinicSummary total={items.length} />
                <ClinicFilters
                    query={query}
                    openOnly={openOnly}
                    onQueryChange={setQuery}
                    onOpenOnlyChange={setOpenOnly}
                    onReset={resetFilters}
                />
                <p>Знайдено: {visibleItems.length}</p>
                <ClinicList
                    items={visibleItems}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    emptyTitle="За вашим запитом закладів не знайдено."
                />
                <p>
                    <Link to={`/appointments/new${appointmentSearch}`}>
                        Оформити запис на прийом
                    </Link>
                </p>
            </Section>
        </>
    );
}