export default function AppointmentSummary({ clinicName, draft }) {
    return (
        <div className="summary-block">
            <h4>Попередній перегляд запису:</h4>
            <dl>
                <dt>Заклад:</dt>
                <dd>{clinicName}</dd>
                <dt>Причина:</dt>
                <dd>{draft.purpose || 'Ще не вказано'}</dd>
                <dt>Тривалість:</dt>
                <dd>{draft.durationHours ? `${draft.durationHours} год` : 'Не вказано'}</dd>
                <dt>Декларація:</dt>
                <dd>{draft.hasDeclaration ? 'Є декларація' : 'Без декларації'}</dd>
            </dl>
        </div>
    );
}