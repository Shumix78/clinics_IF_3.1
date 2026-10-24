export function validateAppointment(input, items) {
    const errors = {};

    const purpose = typeof input.purpose === 'string' ? input.purpose.trim() : '';
    const hoursText = String(input.durationHours ?? '').trim();
    const durationHours = Number(hoursText);

    if (!items.some((item) => item.id === input.clinicId)) {
        errors.clinicId = 'Виберіть наявний заклад із каталогу.';
    }

    if (purpose.length === 0) {
        errors.purpose = 'Укажіть причину звернення.';
    } else if (purpose.length < 10 || purpose.length > 500) {
        errors.purpose = 'Причина звернення має містити від 10 до 500 символів.';
    }

    if (hoursText === '') {
        errors.durationHours = 'Укажіть орієнтовну тривалість.';
    } else if (!Number.isInteger(durationHours) || durationHours < 1 || durationHours > 8) {
        errors.durationHours = 'Тривалість має бути цілим числом від 1 до 8 годин.';
    }

    if (typeof input.hasDeclaration !== 'boolean') {
        errors.hasDeclaration = 'Поле декларації має бути логічним значенням.';
    } else if (!errors.durationHours && durationHours > 4 && !input.hasDeclaration) {
        errors.hasDeclaration = 'Для прийому тривалістю понад 4 години наявність декларації обовʼязкова.';
    }

    if (Object.keys(errors).length > 0) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        errors: {},
        value: {
            clinicId: input.clinicId,
            purpose,
            durationHours,
            hasDeclaration: input.hasDeclaration,
        },
    };
}