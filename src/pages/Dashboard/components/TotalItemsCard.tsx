interface ITotalItemsCard {
  total: number;
  text: string;
}

const TotalItemsCard = ({ total, text }: ITotalItemsCard) => {
  const cardClass =
    'flex flex-col gap-2 justify-center text-center w-64 h-24 box-border border-2 rounded-xl border-gray-200';
  return (
    <div className={cardClass}>
      <p className="text-4xl font-bold">{total}</p>
      <p className="text-md font-bold">{text}</p>
    </div>
  );
};

export { TotalItemsCard };
