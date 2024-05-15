import { IShelter } from '@/service/shelter/types';
import { InfoCard, TotalItemsCard } from '.';

interface IShelterOverview {
  shelters: IShelter[];
  totalShelters: number;
}
const ShelterOverview = ({ shelters, totalShelters }: IShelterOverview) => {
  console.log(shelters);
  return (
    <section className="overview flex gap-2">
      <div className="flex flex-col gap-2 justify-center align-center">
        <TotalItemsCard total={totalShelters} text="Total de abrigos" />
        <TotalItemsCard
          total={totalShelters}
          text="Total de pessoas abrigadas"
        />
      </div>
      <InfoCard
        totalAvaliable={100}
        totalCrowded={70}
        totalNoInformation={130}
      />
    </section>
  );
};

export { ShelterOverview };
