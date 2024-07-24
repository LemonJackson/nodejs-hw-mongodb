const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
    return null;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedContactType = parseContactType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};
