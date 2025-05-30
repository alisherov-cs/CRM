export const isObjectEmpty = (obj: Record<any, any>) => {
  return Object.entries(obj).length === 0;
};
