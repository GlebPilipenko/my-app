export const getCapitalizedString = (value: string) => {
  return `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
};
