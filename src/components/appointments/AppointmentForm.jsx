import AppButton from '../ui/AppButton.jsx';
import FormField from '../ui/FormField.jsx';

export default function AppointmentForm({
                                            idPrefix,
                                            clinicName,
                                            draft,
                                            errors = {},
                                            operationError,
                                            onChange,
                                            onBlur,
                                            onSubmit,
                                            onReset,
                                            submitLabel,
                                        }) {
    const purposeId = `${idPrefix}-purpose`;
    const hoursId = `${idPrefix}-hours`;
    const declId = `${idPrefix}-decl`;
    const hasErrors = Object.keys(errors).length > 0;

    function describedBy(id, error) {
        return `${id}-hint${error ? ` ${id}-error` : ''}`;
    }

    return (
        <form noValidate onSubmit={onSubmit} aria-label="Форма запису на прийом">
            <p>Заклад: <strong>{clinicName}</strong></p>
            <p>Збережіть зміни кнопкою нижче. Дані зберігаються в памʼяті до перезавантаження сторінки.</p>

            {hasErrors && <p role="alert" className="field-error">Виправте позначені поля форми.</p>}
            {errors.clinicId && <p role="alert" className="field-error">{errors.clinicId}</p>}
            {operationError && <p role="alert" className="field-error">{operationError}</p>}

            <FormField
                id={purposeId}
                label="Причина звернення (обовʼязково)"
                hint="Від 10 до 500 символів."
                error={errors.purpose}
            >
        <textarea
            id={purposeId}
            name="purpose"
            rows={3}
            value={draft.purpose}
            onChange={(e) => onChange('purpose', e.target.value)}
            onBlur={() => onBlur('purpose')}
            aria-invalid={Boolean(errors.purpose)}
            aria-describedby={describedBy(purposeId, errors.purpose)}
        />
            </FormField>

            <FormField
                id={hoursId}
                label="Орієнтовна тривалість у годинах (обовʼязково)"
                hint="Ціле число від 1 до 8."
                error={errors.durationHours}
            >
                <input
                    id={hoursId}
                    name="durationHours"
                    type="number"
                    min={1}
                    max={8}
                    step={1}
                    value={draft.durationHours}
                    onChange={(e) => onChange('durationHours', e.target.value)}
                    onBlur={() => onBlur('durationHours')}
                    aria-invalid={Boolean(errors.durationHours)}
                    aria-describedby={describedBy(hoursId, errors.durationHours)}
                />
            </FormField>

            <div className="form-field">
                <label className="checkbox-field" htmlFor={declId}>
                    <input
                        type="checkbox"
                        id={declId}
                        name="hasDeclaration"
                        checked={draft.hasDeclaration}
                        onChange={(e) => onChange('hasDeclaration', e.target.checked)}
                        onBlur={() => onBlur('hasDeclaration')}
                        aria-invalid={Boolean(errors.hasDeclaration)}
                        aria-describedby={describedBy(declId, errors.hasDeclaration)}
                    />
                    Підписано декларацію з лікарем
                </label>
                <p id={`${declId}-hint`} className="field-hint">
                    Для тривалості понад 4 години наявність декларації обовʼязкова.
                </p>
                {errors.hasDeclaration && (
                    <p id={`${declId}-error`} className="field-error">{errors.hasDeclaration}</p>
                )}
            </div>

            <div className="form-actions">
                <AppButton type="submit">{submitLabel}</AppButton>
                <AppButton variant="secondary" onClick={onReset}>
                    Відновити початкові поля
                </AppButton>
            </div>
        </form>
    );
}