const oneThousand = 1000;

export const getFormattedDate = (dt: string | number) => {
  const date = new Date(+dt * oneThousand);
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const dd = date.getDate();

  return `${mm}/${dd}/${yyyy}`;
};

export const getDateToTimeStamp = (strDate: string) => {
  return Date.parse(strDate) / oneThousand;
};
