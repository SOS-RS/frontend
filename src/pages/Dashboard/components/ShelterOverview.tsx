import { InfoCard, TotalItemsCard } from '.';

interface IShelterOverview {
  allPeopleShelters?: number;
  totalShelters?: number;
  shelterAvailable?: number;
  shelterFull?: number;
  shelterWithoutInformation?: number;
}
const ShelterOverview = ({
  allPeopleShelters,
  totalShelters,
  shelterAvailable,
  shelterFull,
  shelterWithoutInformation,
}: IShelterOverview) => {
  return (
    <section className="overview flex gap-2">
      <div className="align-center flex flex-col justify-center gap-2">
        <TotalItemsCard
          total={totalShelters as number}
          text="Total de abrigos"
        />
        <TotalItemsCard
          total={allPeopleShelters as number}
          text="Total de pessoas abrigadas"
        />
      </div>
      <InfoCard
        totalAvaliable={shelterAvailable as number}
        totalCrowded={shelterFull as number}
        totalNoInformation={shelterWithoutInformation as number}
      />
    </section>
  );
};

export { ShelterOverview };
