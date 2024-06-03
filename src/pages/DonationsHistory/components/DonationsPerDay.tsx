import { IDonationsPerDayProps } from '../types';
import { Donation } from './Donation';

const DonationsPerDay = ({ donations, viewOption }: IDonationsPerDayProps) => {
  const donationsOfDay = donations.map((donation) => {
    donation = {
      donationId: donation.id,
      donatorName: donation.shelter.name,
      donatorId: donation.userId,
      shelterId: donation.shelter.id,
      shelterName: donation.shelter.name,
      status: donation.status,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt || null,
      items: donation.donationOrderSupplies,
    };
    console.log(` Donation: `, donation);
    return (
      <Donation
        viewOption={viewOption}
        donation={donation}
        key={`${viewOption}-${donation.donationId}`}
      />
    );
  });

  return (
    <div className="flex items-center">
      <div className="text-[#2f2f2f] font-semibold text-2xl"></div>
      <div className="flex flex-col w-full">{donationsOfDay}</div>
    </div>
  );
};
export { DonationsPerDay };
