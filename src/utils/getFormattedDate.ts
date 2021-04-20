const oneThousand = 1000;

export const getFormattedDate = (dt: string | number) => {
  const date = new Date(+dt * oneThousand);
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
};

export const getDateToTimeStamp = (strDate: string) => Date.parse(strDate) / oneThousand;
