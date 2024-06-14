interface ITotalItemsCard {
  total: number;
  text: string;
}

const TotalItemsCard = ({ total, text }: ITotalItemsCard) => {
  const cardClass =
    'flex flex-col gap-2 justify-center text-center w-64 h-24 box-border border-2 rounded-xl border-gray-200';
  return (
    <div className={cardClass}>
      <p className="font-bold text-4xl">{total}</p>
      <p className="font-bold text-md">{text}</p>
    </div>
  );
};

export { TotalItemsCard };
