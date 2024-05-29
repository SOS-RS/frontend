export const getColorClass = (value: string | number) => {
  switch (value) {
    case 100:
      return "fill-red-300 stroke-red-300";
    case 10:
      return "fill-orange-300 stroke-orange-300";
    case 1:
      return "fill-green-300 stroke-green-300";
    case 0:
      return "fill-slate-300 stroke-slate-300";
    default:
      return "fill-transparent";
  }
};
