import { useCallback, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';

import { BurgerMenu, Header, Loader } from '@/components';
import { useDonations } from '@/hooks/useDonations';
import { DonationHistoryListItem } from './components';
import { DonationOrderServices } from '@/service';
import { DonateOrderStatus } from '@/service/donationOrder/types';
import { useToast } from '@/components/ui/use-toast';
import { withAuth } from '@/hocs';

const DonationsHistoryComponent = () => {
  const [selectedTab, setSelectedTab] = useState<'made' | 'received'>('made');
  const {
    data: donations,
    loading: loadingDonations,
    refresh,
  } = useDonations();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleChangeTab = useCallback(
    (newStatus: 'made' | 'received') => {
      setSelectedTab(newStatus);
      refresh({
        params: {
          op: newStatus,
        },
      });
    },
    [refresh]
  );

  const handleUpdateDonationStatus = useCallback(
    (shelterId: string, newStatus: DonateOrderStatus) => {
      setLoading((prev) => ({ ...prev, [shelterId]: true }));
      DonationOrderServices.update(shelterId, { status: newStatus })
        .then(() => {
          refresh({ params: { op: selectedTab } });
        })
        .catch((err) => {
          toast({
            title: 'Ocorreu um erro ao atualizar o status da doação',
            description: `${err?.response?.data?.message ?? err}`,
          });
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, [shelterId]: false }));
        });
    },
    [refresh, selectedTab, toast]
  );

  const tabsVariants = cva('font-semibold text-lg border-b-2 !text-black', {
    variants: {
      variant: {
        active: 'border-red-500',
        default: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  return (
    <div className="flex flex-col h-screen items-center">
      <Header title="SOS Rio Grande do Sul" startAdornment={<BurgerMenu />} />
      <div className="w-full flex flex-col gap-4 p-4 max-w-4xl [&_*]:text-zinc-500 pb-8">
        <h3 className="text-3xl pt-4 font-bold !text-zinc-900">Suas Doações</h3>
        <Tabs value={selectedTab} className="space-y-4">
          <TabsList className="space-x-4">
            <TabsTrigger
              value="made"
              onClick={() => handleChangeTab('made')}
              className={tabsVariants({
                variant: selectedTab === 'made' ? 'active' : 'default',
              })}
            >
              Doado
            </TabsTrigger>
            <TabsTrigger
              value="received"
              onClick={() => handleChangeTab('received')}
              className={tabsVariants({
                variant: selectedTab === 'received' ? 'active' : 'default',
              })}
            >
              Recebido
            </TabsTrigger>
          </TabsList>
          <TabsContent value="made">
            <Loader loading={loadingDonations}>
              {donations.results.length === 0 ? (
                <p>Nenhuma doação encontrada</p>
              ) : (
                donations.results.map((donation) => (
                  <DonationHistoryListItem
                    key={donation.id}
                    data={donation}
                    loading={loading[donation.shelter.id]}
                    onCancel={() =>
                      handleUpdateDonationStatus(
                        donation.id,
                        DonateOrderStatus.Canceled
                      )
                    }
                    onConfirm={() =>
                      handleUpdateDonationStatus(
                        donation.id,
                        DonateOrderStatus.Complete
                      )
                    }
                  />
                ))
              )}
            </Loader>
          </TabsContent>
          <TabsContent value="received">
            <Loader loading={loadingDonations}>
              {donations.results.length === 0 ? (
                <p>Nenhuma doação encontrada</p>
              ) : (
                donations.results.map((donation) => (
                  <DonationHistoryListItem
                    key={donation.id}
                    data={donation}
                    loading={loading[donation.shelter.id]}
                    onCancel={() =>
                      handleUpdateDonationStatus(
                        donation.id,
                        DonateOrderStatus.Canceled
                      )
                    }
                    onConfirm={() =>
                      handleUpdateDonationStatus(
                        donation.id,
                        DonateOrderStatus.Complete
                      )
                    }
                  />
                ))
              )}
            </Loader>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const DonationsHistory = withAuth(DonationsHistoryComponent);

export { DonationsHistory };
