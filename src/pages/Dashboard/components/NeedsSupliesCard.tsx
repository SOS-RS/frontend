interface INeedsSupliesCard {
  supplies: any;
}

const NeedsSuppliesCard = ({ supplies }: INeedsSupliesCard) => {
  const cardClass =
    'flex flex-col justify-center text-center w-56 h-auto box-border border-2 rounded-xl border-gray-200';
  return (
    <div className={cardClass}>
      <p className="font-bold text-md py-8">{supplies.name}</p>

      <div className="flex box-border border-2">
        <div className="w-full h-10">
          <p className="text-center text-green-300">10</p>
        </div>

        <div className="w-full bg-red-300 h-10">120</div>

        <div className="w-full bg-gray-300 h-10">100</div>
      </div>
    </div>
  );
};

export { NeedsSuppliesCard };
