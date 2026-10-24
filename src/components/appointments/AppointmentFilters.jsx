import AppButton from '../ui/AppButton.jsx';
import FormField from '../ui/FormField.jsx';

export default function AppointmentFilters({
                                               query,
                                               decl,
                                               sort,
                                               onQueryChange,
                                               onDeclChange,
                                               onSortChange,
                                               onReset,
                                           }) {
    return (
        <div className="request-filters">
            <FormField id="app-filter-query" label="Пошук у записах">
                <input
                    id="app-filter-query"
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                />
            </FormField>

            <FormField id="app-filter-decl" label="Наявність декларації">
                <select id="app-filter-decl" value={decl} onChange={(e) => onDeclChange(e.target.value)}>
                    <option value="all">Усі записи</option>
                    <option value="yes">З декларацією</option>
                    <option value="no">Без декларації</option>
                </select>
            </FormField>

            <FormField id="app-filter-sort" label="Сортування">
                <select id="app-filter-sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
                    <option value="clinic">За назвою поліклініки</option>
                    <option value="duration-asc">Спочатку коротші</option>
                    <option value="duration-desc">Спочатку довші</option>
                </select>
            </FormField>

            <AppButton variant="secondary" onClick={onReset}>
                Скинути умови
            </AppButton>
        </div>
    );
}