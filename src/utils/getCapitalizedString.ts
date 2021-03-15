export const getCapitalizedString = (value?: string) => {
    if (value) {
        return `${value[0]?.toUpperCase()}${value?.slice(1).toLowerCase()}`;
    }
};
