export const getCapitalizedString = (value: string) => (
  `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`
);
