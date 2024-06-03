import { Header, LoadingScreen } from '@/components';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShelter } from '@/hooks';
import { IDonations, IDonationsPerDay, ViewOptions } from './types';
import { useDonations } from '@/hooks/useDonations';
import { useEffect, useState } from 'react';
import { DonationsPerDay } from './components/DonationsPerDay';

const DonationsHistory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { shelterId = '-1' } = params;
  const { data: shelter, loading: shelterLoading } = useShelter(shelterId);
  const { data: shelterDonations, loading: donationsLoading } =
    useDonations(shelterId);
  const [donationsReceivedPerDay, setDonationsReceivedPerDay] = useState<
    IDonationsPerDay | {}
  >([]);
  const [donationsGivenPerDay, setDonationsGivenPerDay] = useState<
    IDonationsPerDay | {}
  >([]);

  const [viewOption, setViewOption] = useState(ViewOptions.Donated);

  const toggleViewOption = () => {
    setViewOption((prevOption) =>
      prevOption === ViewOptions.Donated
        ? ViewOptions.Received
        : ViewOptions.Donated
    );
  }; //Toggles between donates items and received items

  //Groups donations per day
  const donationGroupedByDate = (donations: IDonations): IDonationsPerDay => {
    console.log(`donations: `, donations);
    return donations.reduce<IDonationsPerDay>((acc, donation) => {
      const date = donation.createdAt.split('T')[0];

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(donation);

      return acc;
    }, {});
  };

  // Filters donations into received and given based on shelterId
  const filterDonationsByCase = (
    donations: IDonationsPerDay,
    shelterId: string
  ) => {
    const receivedDonations: IDonationsPerDay = {};
    const givenDonations: IDonationsPerDay = {};

    Object.keys(donations).forEach((date) => {
      receivedDonations[date] = donations[date].filter(
        (donation) => donation.shelter.id === shelterId
      );
      givenDonations[date] = donations[date].filter(
        (donation) => donation.shelter.id !== shelterId
      );
    });

    return { receivedDonations, givenDonations };
  };

  useEffect(() => {
    if (!donationsLoading) {
      const donationsPerDay = donationGroupedByDate(shelterDonations.results);
      const { receivedDonations, givenDonations } = filterDonationsByCase(
        donationsPerDay,
        shelterId
      );
      setDonationsGivenPerDay(givenDonations);
      setDonationsReceivedPerDay(receivedDonations);
    }
  }, [donationsLoading]);

  if (!donationsLoading) {
    const dailyDonations = {
      donated: donationsGivenPerDay,
      received: donationsReceivedPerDay,
    };
    // Instantiates a DonationsPerDay container for each day
    console.log('givenDonations ', donationsGivenPerDay);
    console.log('receivedDonations ', donationsReceivedPerDay);
    const segmentedDonationsDisplay = Object.keys(
      dailyDonations[viewOption]
    ).map((day) => {
      console.log(
        `dailyDonations[viewOption][day] `,
        dailyDonations[viewOption][day]
      );
      return (
        <div key={day}>
          <h3 className="font-semibold text-lg h-full">{day}</h3>
          <div className="">
            <DonationsPerDay
              donations={dailyDonations[viewOption][day]}
              // donations={day}
              viewOption={viewOption}
              key={`${viewOption}-${day}`}
            />
          </div>
        </div>
      );
    });
    console.log(`segmentedDonationsDisplay `, segmentedDonationsDisplay);
    if (donationsLoading) return <LoadingScreen />;

    return (
      <div className="flex flex-col h-screen items-center">
        <Header
          title={shelter.name}
          startAdornment={
            <Button
              size="sm"
              variant="ghost"
              className="[&_svg]:stroke-white disabled:bg-red-500 hover:bg-red-400"
              onClick={() => navigate('/')}
            >
              <ChevronLeft size={20} />
            </Button>
          }
        />
        <div className="p-4 flex flex-col max-w-5xl w-full h-full gap-4">
          <div className="flex items-center gap-1">
            <h1 className="text-[#2f2f2f] font-semibold text-2xl">
              Suas doações
            </h1>
          </div>
          <div className="flex p-0 m-0 gap-4">
            <div
              className={`flex items-center  justify-center p-0 m-0 border-b-2 border-transparent ${
                viewOption === ViewOptions.Donated ? 'border-red-500' : ''
              }`}
              onClick={() => toggleViewOption()}
            >
              <h3 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500">
                Doado
              </h3>
            </div>
            <div
              className={`flex items-center  justify-center p-0 m-0 border-b-2 border-transparent ${
                viewOption === ViewOptions.Received ? 'border-red-500' : ''
              }`}
              onClick={() => toggleViewOption()}
            >
              <h3 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500">
                Recebido
              </h3>
            </div>
          </div>
          {segmentedDonationsDisplay}
        </div>
      </div>
    );
  }
};
export { DonationsHistory };
