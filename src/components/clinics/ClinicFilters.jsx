import AppButton from '../ui/AppButton.jsx';
import FormField from '../ui/FormField.jsx';

export default function ClinicFilters({ query, openOnly, onQueryChange, onOpenOnlyChange, onReset }) {
    return (
        <div className="catalog-filters">
            <FormField id="filter-query" label="Пошук за назвою">
                <input
                    id="filter-query"
                    type="search"
                    value={query}
                    placeholder="напр. Поліклініка №1"
                    onChange={(e) => onQueryChange(e.target.value)}
                />
            </FormField>

            <label className="checkbox-field">
                <input
                    type="checkbox"
                    checked={openOnly}
                    onChange={(e) => onOpenOnlyChange(e.target.checked)}
                />
                Лише чергові
            </label>

            <AppButton variant="secondary" onClick={onReset}>
                Скинути фільтри
            </AppButton>
        </div>
    );
}